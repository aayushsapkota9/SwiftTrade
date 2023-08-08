const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
    name: String,
    category: String,
    purchasePrice: Number,
    sellingPrice: Number,
    image: String,

});


const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;