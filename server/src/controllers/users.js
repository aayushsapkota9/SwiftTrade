const Users = require('../models/users')

const registerUser = async (req, res) => {
    await Users.create(req.body)
    res.json({
        msg: "you are successfully registered"
    })
}
const checkIfUserExists = async (req, res) => {
    const data = await Users.findOne({ email: req.params.email })
    if (data) {
        res.json({
            msg: "Email already exists",
            validPhoneNumber: false
        })
    } else {
        res.json({
            validPhoneNumber: true
        })
    }
}
module.exports = { registerUser, checkIfUserExists };