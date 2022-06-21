const mongoose = require("mongoose");

const conn = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/billing_system", ()=>{
        console.log("connected");
    })
}

module.exports = conn;