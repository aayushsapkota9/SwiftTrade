const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
    customerDetails: Object,
    billDetails: Array,
    date: String,
    billNo: Number,
});


const Bill = mongoose.model('Bills', billSchema);
module.exports = Bill;