const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  report: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['blood', 'usg', 'xray', 'ctscan', 'mri']
  }
});

module.exports = mongoose.model('Test', testSchema);
