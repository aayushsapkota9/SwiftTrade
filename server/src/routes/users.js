const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
router.post('/register', userController.registerUser)
router.get('/checkUser/:email', userController.checkIfUserExists)
module.exports = router;


