const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
    name: String,
    category: String,
    purchasePrice: Number,
    sellingPrice: Number,
    itemImage: { type: String, default: null },

});


const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;