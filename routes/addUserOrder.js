const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.post('/add-order', async (req, res) => {
    try {
        const { _id, orderNumber, orderDate } = req.body

        const user = await User.findOne({ _id })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const newOrder = {
            orderNumber,
            orderDate: new Date(orderDate)
        }

        user.orderHistory.push(newOrder)
        await user.save()

        res.status(200).json({ message: 'Order added successfully', orderHistory: user.orderHistory })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router