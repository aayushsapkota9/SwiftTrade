const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    companyName: String,
    email: String,
    password: String,
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    country: { type: String, default: null },
});


const Users = mongoose.model('Users', userSchema);
module.exports = Users;