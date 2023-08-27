const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/inventory')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`)
    }
})

const upload = multer({ storage: storage })
const inventoryController = require('../controllers/inventory')
router.post('/items', upload.single('image'), inventoryController.addInventory)
router.put('/items/:id', upload.single('image'), inventoryController.editInventory)
router.get('/all-items', inventoryController.getAllInventory)
router.get('/item/:id', inventoryController.getOneInventoryItem)
router.get('/item-image/:id', inventoryController.getItemImageById)
router.delete('/items/:id', inventoryController.deleteInventory)
module.exports = router;


