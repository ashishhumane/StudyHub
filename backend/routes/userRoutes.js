const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const authenticate = require('../middlewares/auth')

router.get('/getuser', authenticate, async (req, res) => {
    const user = await userModel.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({user});
})

module.exports = router
