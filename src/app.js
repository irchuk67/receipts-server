const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://receipts:receipts@localhost:27017/receipts');
console.log(process.env.MONGODB_URI)
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*'
}));
require('./models/Receipt')
require('./models/User')
app.use(require('./routes'))
app.listen(PORT, (error) => {
    if(!error) {
        console.log(`Server side is running on port ${PORT}`)
    } else {
        console.log("Error: ", error)
    }
})