const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategoryName: {
    type: String,
    required: true,
  },
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
