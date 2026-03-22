const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: String, required: true }, // Name of the doctor who prescribed
  date: { type: Date, default: Date.now },
  medicines: [{
    name: { type: String, required: true },
    dosage: { type: String },
    duration: { type: String }
  }],
  notes: { type: String }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
