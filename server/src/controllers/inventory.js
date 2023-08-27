const Inventory = require('../models/inventory');
const fs = require('fs')
const path = require('path')

const addInventory = async (req, res) => {
    try {
        const fields = req.body
        fields.itemImage = req.file?.filename
        const data = await Inventory.create(fields);
        if (data) {
            res.status(200).json({
                msg: "Item successfully added to Inventory ",
                success: true,
            })

        }
        else {
            res.json({
                msg: "something went wrong",
                success: false,
            })
        }
    } catch (err) {
        console.log(err)
    }
}
const getAllInventory = async (req, res) => {
    try {
        const data = await Inventory.find().limit(req.query.size).skip((req.query.page - 1) * req.query.size)
        const count = await Inventory.find().count()

        if (data) {
            res.json({
                inventoryList: data,
                msg: "Success",
                success: true,
                count,
            })
        }

    } catch (error) {
        console.log(error)
    }
}
const getItemImageById = async (req, res) => {
    try {
        const data = await Inventory.findById(req.params.id);
        if (!data) {
            res.json({
                msg: 'no data found'
            })
        }
        const imageDir = path.join(__dirname, '../../', 'uploads/inventory/' + data.itemImage)
        const defaultDir = path.join(__dirname, '../../', 'uploads/inventory/default_product.jpg')

        if (fs.existsSync(imageDir)) {
            res.sendFile(imageDir)
        } else {
            res.sendFile(defaultDir)
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({
            msg: 'Item id doesn\'t exist'
        })
    }
}
const editInventory = async (req, res) => {
    try {
        const fields = req.body
        fields.itemImage = req.file?.filename

        const data = await Inventory.findByIdAndUpdate(req.params.id, fields)
        if (data) {
            res.status(200).json({
                msg: "Edit Item Successful ",
                success: true,
            })

        }
        else {
            res.json({
                msg: "something went wrong",
                success: false,
            })
        }
    } catch (err) {
        console.log(err)
    }
}
const deleteInventory = async (req, res) => {
    try {
        const fields = req.body
        fields.itemImage = req.file?.filename
        const data = await Inventory.findByIdAndDelete(req.params.id)
        if (data) {
            res.status(200).json({
                msg: "Item Deleted ",
                success: true,
            })
        }
        else {
            res.json({
                msg: "Something went wrong",
                success: false,
            })
        }
    } catch (err) {
        console.log(err)
    }
}
const getOneInventoryItem = async (req, res) => {
    try {
        const data = await Inventory.findById(req.params.id)
        if (data) {
            res.status(200).json({
                item: data,
                msg: "Success",
                success: true,
            })
        }
        else {
            res.json({
                msg: "Item with the id doesn't exist",
                success: false,
            })
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = { addInventory, getAllInventory, getItemImageById, editInventory, deleteInventory, getOneInventoryItem };