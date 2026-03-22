const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableCount: { type: Number, required: true },
  iconName: { type: String, required: true } // Name of Lucide icon to use
});

module.exports = mongoose.model('Specialist', specialistSchema);
