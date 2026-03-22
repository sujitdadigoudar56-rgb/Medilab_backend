const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['hero', 'admin', 'doctor', 'nurse', 'patient']
  },
  iconName: { type: String },
  color: { type: String }
});

module.exports = mongoose.model('Stat', statSchema);
