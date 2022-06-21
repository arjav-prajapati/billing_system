const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
    itemName :{
        type: String,
        required: true,
    },
    itemNo : {
        type:Number,
        required:true,
    },
    itemStock:{
        type:Number,
        required:true,
        default:0
    },
    itemPrice:{
        type:Number,
        required:true
    },
    finished:{
        type:Boolean,
        required:true,
        default:false
    },
    lastStockAdded:{
        type:Date,
        required:true,
        default:Date.now()       
    }
})

const Stocks = mongoose.model('stocks',stockSchema);
module.exports = Stocks;