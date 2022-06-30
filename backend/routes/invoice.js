const express = require('express');
const Invoice = require('../modals/invoice');
const router = express.Router();
const Joi = require('joi');

//Get invoices
router.get('/invoices', async(req,res)=>{
    try{
        const getInvoices = await Invoice.find();
        res.status(200).json({success:true,obj:getInvoices});
    }catch(error){
        res.status(500).json({success:false,msg:"Internal Server error!!"});
    }
})


//make a bill
router.post('/bill', async(req,res) =>{
    try {
        const getInvoiceNo = await Invoice.find({},{invoiceNo:1});
        const InvoiceNo = getInvoiceNo.length + 1;
        const schema = Joi.object({
            custName: Joi.string(),
            itemPurchased: Joi.array().required(),
            totalPurchasedPrice: Joi.number().required()
        });
    
        const result = schema.validate({custName:req.body.custName,itemPurchased:req.body.itemPurchased,totalPurchasedPrice:req.body.totalPurchasedPrice});
        
        if(result.error){
            res.status(400).json({success:false,msg:result.error.details[0].message});
        }else{
            const newInvoice = await Invoice.create({
                invoiceNo:InvoiceNo,
                custName:req.body.custName,
                itemPurchased:req.body.itemPurchased,
                totalPurchasedPrice:req.body.totalPurchasedPrice
            });
            res.send(newInvoice);
        }
    } catch (error) {
        res.status(500).json({success:false,msg:"Internal server error"});
    }
})



module.exports = router;