const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userName: {
    type: String,
    required: false
  },
  items: [
    {
      menuItem: {
        type: String,
        ref: 'Product',
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  eta: {
    type: Number,
    required: true,
    default: function() {
      return Math.floor(13 + Math.random() * 20);
    }
  },
  orderNumber: {
    type: String,
    unique: true,
    default: function() {
      return 'AIRBEAN#' + Math.floor(10000 + Math.random() * 90000);
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);