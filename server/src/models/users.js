const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    companyName: String,
    email: String,
    password: String
    // role: { type: String, default: 'none' }
});


const Users = mongoose.model('Users', userSchema);
module.exports = Users;