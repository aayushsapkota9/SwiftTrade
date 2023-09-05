const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
    customerDetails: Object,
    billDetails: Array,
    Date: new Date(),
});


const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;