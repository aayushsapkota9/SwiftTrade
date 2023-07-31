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
                msg: "Phone Number already exists",
                success: false
            })
        } else {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds)
            var token = jwt.sign({ foo: 'bar' }, process.env.SECRET_KEY
            );

            const data = await Users.create(req.body);
            const { password, ...otherUsersFields } = data._doc;
            res.json({
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
module.exports = { registerUser };