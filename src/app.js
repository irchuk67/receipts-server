const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
mongoose.connect("mongodb+srv://receipts:receipts@cluster0.kkfjbu2.mongodb.net/mongo?retryWrites=true&w=majority");
console.log(process.env.MONGODB_URI)
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*'
}));
require('./models/Receipt')
require('./models/User')
const mongodb = require("mongodb");
app.use(require('./routes'))
app.listen(PORT, (error) => {
    if(!error) {
        console.log(`Server side is running on port ${PORT}`)
    } else {
        console.log("Error: ", error)
    }
})