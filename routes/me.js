const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const User = require('../models/User')

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.user.userId })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json({ user })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router