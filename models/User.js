const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

// ORDER SCHEMA
const OrderSchema = new mongoose.Schema(
    {
      orderNumber: {
        type: String,
      },
        orderDate: {
            type: Date,
            default: Date.now,
        },
      totalPrice: {
        type: Number,
        default: 0,
      }
    },
    {
      timestamps: true
    }
  )

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    orderHistory: [
        OrderSchema
    ] 
})

// Clean up
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id
        delete ret.__v
        delete ret.password 
        return ret
    }
})

module.exports = mongoose.model('User', userSchema)