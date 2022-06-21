const express = require("express");
const Stocks = require("../modals/stocks");
const router = express.Router();
const Joi = require('joi');



//Create a new item stock
router.post('/addItem', async (req, res) => {

    const schema = Joi.object({
        itemName: Joi.string().required(),
        itemNo: Joi.number().required(),
        itemStock: Joi.number().required(),
        itemPrice:Joi.number().required(),
    });

    const result = schema.validate({ itemName: req.body.itemName, itemNo: req.body.itemNo, itemStock: req.body.itemStock ,itemPrice:req.body.itemPrice});

    if (result.error) {
        res.status(400).json({ success: false, msg: result.error.details[0].message });
        return;
    } else {
        try {
            if (req.body.itemStock === 0) {
                const item = await Stocks.create({
                    itemName: req.body.itemName,
                    itemNo: req.body.itemNo,
                    itemStock: req.body.itemStock,
                    itemPrice: req.body.itemPrice,
                    finished: true
                })
                res.status(200).json({ success: true, obj: item });
            } else {
                const item = await Stocks.create({
                    itemName: req.body.itemName,
                    itemNo: req.body.itemNo,
                    itemPrice: req.body.itemPrice,
                    itemStock: req.body.itemStock
                })
                res.status(200).json({ success: true, obj: item });
            }

        } catch (error) {
            res.status(500).send(error);
        }
    }
})

//Fetching all item data from stocks collection
router.get('/fetchItems', async(req,res) =>{
    try {
        const items = await Stocks.find().sort({itemName:1});
        res.status(200).json({success:true,obj:items});
    } catch (error) {
        res.status(500).json({success:false,msg:"Internal server error!!"});
    }
});




//add stock
router.put('/addStock/:id', async (req, res) => {

    const schema = Joi.object({
        itemName: Joi.string().required(),
        itemStock: Joi.number().required()
    });

    const result = schema.validate({ itemName: req.body.itemName, itemStock: req.body.itemStock });
    if (result.error) {
        res.status(400).json({ success: false, msg: result.error.details[0].message });
        return;
    } else {
        try {
            const update = await Stocks.findByIdAndUpdate(req.params.id, { $set: { itemName: req.body.itemName, itemStock: req.body.itemStock ,lastStockAdded:Date.now()} }, { new: true });
            res.status(200).json({ success: true, obj: update });
        } catch (error) {
            res.status(500).json({ success: false, msg: "Internal server error!" });
        }
    }
});

//falg item as finished(false or true)
router.put('/itemFinished/:id', async (req, res) => {
    try {
        const item = await Stocks.findById(req.params.id);
        console.log(item);
        if (item.finished === false) {
            const update = await Stocks.findByIdAndUpdate(req.params.id, { $set: { finished: true } }, { new: true });
            res.send(update);
        }else if(item.finished === true){
            const update = await Stocks.findByIdAndUpdate(req.params.id, { $set: { finished: false } }, { new: true });
            res.send(update);
        }else{
            res.status(500).json({success:false,msg:"Unpreception error occured"});
        }
    } catch (error) {
        res.status(500).json({success:false,msg:error});
    }
    // res.status(200).json({success:true,obj:update});
});



module.exports = router;