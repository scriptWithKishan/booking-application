const mongoose = require('mongoose')

const sellerCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  }
}, { timestamps: true })

sellerCategorySchema.index({ name: 1, seller: 1 }, { unique: true })

const SellerCategory = mongoose.model('SellerCategory', sellerCategorySchema)

module.exports = SellerCategory
