const Bill = require('../models/bill');
const addBill = async (req, res) => {
    try {
        console.log(req.body)
        // const data = await Inventory.create(fields);
        data = true
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
module.exports = { addBill };