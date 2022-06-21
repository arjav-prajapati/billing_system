const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
    invoiceNo:{
        type: Number,
        required:true
    },
    custName:{
        type:String,
        required:true
    },
    itemPurchased:{
        type:Array,
        required:true
    },
    invoiceDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    totalPurchasedPrice:{
        type:Number,
        required:true
    }
});

const Invoice = mongoose.model('Invoice',invoiceSchema);

module.exports = Invoice;