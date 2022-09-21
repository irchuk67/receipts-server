const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://receipts:receipts@localhost:27017/receipts');

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*'
}));
require('./models/Receipt')
app.use(require('./routes'))
app.listen(PORT, (error) => {
    if(!error) {
        console.log(`Server side is running on port ${PORT}`)
    } else {
        console.log("Error: ", error)
    }
})
/*


const baseURL = '/api/receipts/';
//get all receipts


app.get(baseURL, (req, res) => {
    res.json(receipts);
});

//get single receipt
app.get(`/api/receipts/:receiptId`, (req, res) => {
    const {receiptId} = req.params;
    const singleReceipt = receipts.find(receipt => receipt.id === Number(receiptId));
    if(!singleReceipt){
        return res.status(404).send('Product does not exist')
    }
    res.json(singleReceipt)
});
*/

// module.exports = app;