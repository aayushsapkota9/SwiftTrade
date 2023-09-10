const Bill = require('../models/bill');
const addBill = async (req, res) => {
    try {
        const fields = req.body
        console.log(fields)
        const data = await Bill.create(fields);
        if (data) {
            res.status(200).json({
                msg: "Bill created",
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