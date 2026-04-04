const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  sellers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  }]
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category

