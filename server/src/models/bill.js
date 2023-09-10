const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
    customerDetails: Object,
    billDetails: Array,
    Date: String,
});


const Bills = mongoose.model('Bills', inventorySchema);
module.exports = Bills;