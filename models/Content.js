const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true }, // e.g., 'features', 'wellness'
  title: { type: String, required: true },
  description: { type: String },
  iconName: { type: String },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Content', contentSchema);
