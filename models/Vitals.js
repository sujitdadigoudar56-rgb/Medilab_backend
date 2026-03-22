const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  bloodPressure: { type: String },
  temperature: { type: String },
  pulse: { type: String },
  spO2: { type: String }
});

module.exports = mongoose.model('Vitals', vitalsSchema);
