const Inventory = require('../models/inventory');
const addInventory = async (req, res) => {
    try {
        const fields = req.body
        fields.image = req.file.filename
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
                count
            })
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = { addInventory, getAllInventory };