const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    companyName: String,
    email: String,
    password: String,
    address: { type: String, default: 'none' },
    city: { type: String, default: 'none' },
    state: { type: String, default: 'none' },
    country: { type: String, default: 'none' },
});


const Users = mongoose.model('Users', userSchema);
module.exports = Users;