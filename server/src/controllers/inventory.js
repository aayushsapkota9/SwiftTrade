const Inventory = require('../models/inventory')
// const registerUser = async (req, res) => {
//     try {
//         //check if user already exists
//         const data = await Users.findOne({ email: req.body.email })
//         if (data) {
//             res.status(409).json({
//                 msg: "Phone Number already exists",
//                 success: false,
//             })
//         } else {
//             req.body.password = await bcrypt.hash(req.body.password, saltRounds)
//             const token = jwt.sign({ foo: 'bar' }, process.env.SECRET_KEY
//             );

//             const data = await Users.create(req.body);
//             const { password, ...otherUsersFields } = data._doc;
//             res.status(200).json({
//                 msg: "you are successfully registered",
//                 success: true,
//                 token,
//                 userDetails: otherUsersFields
//             })
//         }

//     } catch (err) {
//         console.log(err)
//     }
// }
const addInventory = async (req, res) => {

    try {
        const data = await Inventory.create(req.body)
        res.status(200).json({
            msg: "Item added to cart",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { addInventory };