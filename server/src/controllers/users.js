const Users = require('../models/users')
const saltRounds = 10;
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        //check if user already exists
        const data = await Users.findOne({ email: req.body.email })
        if (data) {
            res.status(409).json({
                msg: "Email already exists",
                success: false,
            })
        } else {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds)
            const token = jwt.sign({ foo: 'bar' }, process.env.SECRET_KEY
            );

            const data = await Users.create(req.body);
            const { password, ...otherUsersFields } = data._doc;
            res.status(200).json({
                msg: "you are successfully registered",
                success: true,
                token,
                userDetails: otherUsersFields
            })
        }

    } catch (err) {
        console.log(err)
    }

}
const login = async (req, res) => {
    try {
        const data = await Users.findOne({ email: req.body.email })
        if (data) {
            const isMatched = await bcrypt.compare(req.body.password, data.password)
            if (isMatched) {
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
                const { password, ...otherFields } = data._doc
                res.json({
                    msg: "Login Successful",
                    token: token,
                    success: true,
                    userDetails: otherFields
                })
            } else {
                res.json({
                    success: false,
                    msg: "Password didn't matched"
                })
            }
        } else {
            res.json({
                success: false,
                msg: "Email doesn't exist"
            })
        }
    } catch (err) {
        console.log(err)
    }

}
module.exports = { registerUser, login };