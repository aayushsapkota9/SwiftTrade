const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory')
router.post('/items', inventoryController.addInventory)
module.exports = router;


