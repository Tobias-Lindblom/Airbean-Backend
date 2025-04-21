const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

const validateInput = require('../middleware/validateInput')
const nameChecker = require('../middleware/nameChecker')




//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//Create user
router.post('/', validateInput, nameChecker, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({ 
            name: req.body.name, 
            password: hashedPassword 
        })

        const newUser = await user.save()
        res.status(201).json({
            message: `New user with name ${newUser.name} has been registered!`,
            user: newUser
        })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//Delete user
router.delete('/', async (req, res) => {
    try {
        const result = await User.deleteMany({})
        res.json({ message: `Deleted ${result.deletedCount} users.` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router