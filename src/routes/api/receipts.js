const express = require('express');
const mongoose = require('mongoose');
const {deleteReceipt, updateReceipt, fetchReceipts, fetchReceiptById, createReceipt} = require("../../services/receiptService");
const {NO_CONTENT, OK, NOT_FOUND, CREATED} = require("../../constants/HTTPCodes");
const Receipt = mongoose.model('Receipt');
const router = express.Router();


router.get('/', async (request, response) => {
    const receipts = await fetchReceipts();
    if(!receipts){
        response.status(NOT_FOUND).send('no receipts found')
    }else{
        const formattedReceipts = receipts.map(receipt =>{
            return {
                id: receipt._id,
                text: receipt.text
            }
        })
        response.status(OK).json(formattedReceipts)
    }
});

router.get(`/:receiptId/`, async (request, response) => {
    const receipt = await fetchReceiptById(request.params.receiptId);
    if (!receipt) {
        response.status(NOT_FOUND).send('no receipt found')
    }else{
        const receiptOut = {
            id: receipt._id,
            text: receipt.text
        }
        response.status(OK).json(receiptOut)
    }
})

router.delete(`/:receiptId`, async (request, response) => {
    const isDeleted = await deleteReceipt(request.params.receiptId);
    console.log(isDeleted)
    if (!isDeleted){
        response.status(NOT_FOUND).send('no receipt found')
    }else{
        response.status(NO_CONTENT).send('deleted successfully')
    }
})

router.use(express.json());

router.put('/:receiptId', async (request, response) => {
    let updatedReceipt = await updateReceipt(request.params.receiptId, request.body)
    if (updatedReceipt === null){
        response.status(NOT_FOUND).send('no receipt found')
    }else{
        response.status(OK).json(updatedReceipt)
    }
})

router.post('/', async (request, response) => {
    const newReceipt = await createReceipt(request.body);
    if (!newReceipt) {
        response.status(NOT_FOUND).send('no receipt created')
    }else{
        const receiptOut = {
            id: newReceipt._id,
            text: newReceipt.text
        }
        response.status(CREATED).json(receiptOut)
    }
});


module.exports = router;
