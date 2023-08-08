const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/inventory')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
const inventoryController = require('../controllers/inventory')
router.post('/items', upload.single('avatar'), inventoryController.addInventory)
router.get('/all-items', inventoryController.getAllInventory)
module.exports = router;


