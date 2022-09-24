const express = require('express');
const mongoose = require('mongoose');
const {response} = require("express");
const Receipt = mongoose.model('Receipt');
const router = express.Router();

router.get('/', (req, res) => {
    Receipt.find({}).then(response => {
        const receipts = response.map(receipt => {
            return{
                id: receipt._id,
                text: receipt.text
            }
        })
        res.json(receipts)
    });
});

router.get(`/:receiptId/`, async (req, res) => {
    await Receipt.findById(req.params.receiptId).then(receipt => {
        if(!receipt) res.status(401)
        const receiptOut = {
            id: receipt._id,
            text: receipt.text
        }
        res.status(200).json(receiptOut)
    })
})

router.delete(`/:receiptId`, async (req, res) => {
    await Receipt.findById(req.params.receiptId)
        .then(response => {
            console.log(response)
            if(!response) res.status(404).send('no such receipt');
            else {
                console.log(response)
                Receipt.deleteOne(response).then(() => {
                    res.status(204).json(response)
                }).catch(err => console.log(err))
            }
        })

})

router.use(express.json());

router.post('/', (req, res) => {
    const newReceipt = new Receipt({
        text: req.body.text
    })

    newReceipt.save().then(() => {
        return res.status(201).json({receipt: newReceipt.toJSONFor()});
    }).catch()

})

module.exports = router;
