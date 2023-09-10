const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')
router.post('/bill', billController.addBill)
// router.put('/items/:id', upload.single('image'), inventoryController.editInventory)
// router.get('/all-items', inventoryController.getAllInventory)
// router.get('/item/:id', inventoryController.getOneInventoryItem)
// router.get('/item-image/:id', inventoryController.getItemImageById)
// router.delete('/items/:id', inventoryController.deleteInventory)
module.exports = router;


