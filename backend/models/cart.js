const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
})

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true })

cartSchema.methods.getTotalPrice = async function() {
  const populatedCart = await this.populate('items.product')
  return populatedCart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
