const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory')
router.post('/items', upload.single('image'), inventoryController.addInventory)
router.put('/items/:id', upload.single('image'), inventoryController.editInventory)
router.get('/all-items', inventoryController.getAllInventory)
router.get('/item/:id', inventoryController.getOneInventoryItem)
router.get('/item-image/:id', inventoryController.getItemImageById)
router.delete('/items/:id', inventoryController.deleteInventory)
module.exports = router;


