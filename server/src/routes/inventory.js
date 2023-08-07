const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory')
router.post('/items', inventoryController.addInventory)
router.get('/items', inventoryController.getAllInventory)
module.exports = router;


