const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' }, // Can be a specialist category or specific doctor
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  type: { type: String, enum: ['test', 'consultation'], required: true },
  isRetest: { type: Boolean, default: false },
  previousReportUrl: { type: String },
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'paid', 'failed'], 
    default: 'unpaid' 
  },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
