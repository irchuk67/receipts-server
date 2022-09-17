const express = require('express');
const cors = require("cors");

const receipts = [
    {id: 1, text: 'receipt  1;'},
    {id: 2, text: 'receipt 2'}
]

const app = express();

const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Server side is running on port ${PORT}`))

app.use(cors({
    origin: '*'
}));

app.get('/api/receipts', (req, res) => {
    res.send(receipts)
})