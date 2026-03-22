const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tests: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  tag: { type: String },
  category: { 
    type: String, 
    required: true,
    enum: ['recommended', 'special']
  }
});

module.exports = mongoose.model('Package', packageSchema);
