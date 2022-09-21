const express = require('express');
const mongoose = require('mongoose');
const Receipt = mongoose.model('Receipt');
const router = express.Router();

const receipts = [
    {id: 1, text: 'receipt 1'},
    {id: 2, text: 'receipt 2'}
]
router.get('/', (req, res) => {
    Receipt.find({}).then(response => {
        console.log(response);
        const receipts = response.map(receipt => {
            return{
                id: receipt._id,
                text: receipt.text
            }
        })
        res.json(receipts)
    });
})

router.use(express.json());

router.post('/', (req, res) => {
    const newReceipt = new Receipt({
        text: req.body.text
    })

    newReceipt.save().then(() => {
        console.log(newReceipt)
        return res.status(201).json({receipt: newReceipt.toJSONFor()});
    }).catch()

})

module.exports = router;
