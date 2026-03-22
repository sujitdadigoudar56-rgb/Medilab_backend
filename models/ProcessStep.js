const mongoose = require('mongoose');

const processStepSchema = new mongoose.Schema({
  iconName: { type: String, required: true },
  stepNumber: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true }
});

module.exports = mongoose.model('ProcessStep', processStepSchema);
