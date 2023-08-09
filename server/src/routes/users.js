const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
router.post('/register', userController.registerUser)
router.post('/login', userController.login)
router.put('/profile/:id', userController.updateProfile)
router.put('/change-password/:id', userController.changePassword)
module.exports = router;


