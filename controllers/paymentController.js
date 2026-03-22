const Razorpay = require('razorpay');
const crypto = require('crypto');
const Appointment = require('../models/Appointment');
const Payment = require('../models/Payment');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, appointmentId } = req.body;
    console.log(`Creating order for Appointment: ${appointmentId}, Amount: ${amount}`);

    if (!amount || !appointmentId) {
       console.error('Missing amount or appointmentId');
       return res.status(400).json({ message: 'Missing amount or appointmentId' });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);
    console.log('Razorpay Order Created:', order.id);

    // Update appointment with order ID
    await Appointment.findByIdAndUpdate(appointmentId, { razorpayOrderId: order.id });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: error.message || 'Error creating payment order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      appointmentId 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Create Payment object
      const payment = new Payment({
        appointment: appointmentId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amount: req.body.amount || 0, // Should pass amount from frontend or fetch from appointment
        status: 'completed'
      });
      const savedPayment = await payment.save();

      // Update appointment
      await Appointment.findByIdAndUpdate(appointmentId, {
        paymentStatus: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        payment: savedPayment._id, // Store ref to payment object
        status: 'confirmed'
      });
      return res.status(200).json({ message: "Payment verified successfully", payment: savedPayment });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};
