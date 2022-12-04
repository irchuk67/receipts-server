const mongoose = require('mongoose');
const {response} = require("express");
const {NO_CONTENT} = require("../constants/HTTPCodes");
const Receipt = mongoose.model('Receipt');

function fetchReceipts(){
    return Receipt.find({})
}

function fetchReceiptById(id){
    return Receipt.findById(id)
}

function deleteReceipt(id){
    return Receipt.findById(id).then(response => {
        console.log(response)
        if (!response) return null;
        else {
            return Receipt.deleteOne(response)
                .catch(err => console.log(err))
        }
    })
}

function createReceipt(newReceipt){
    const receiptToCreate = new Receipt({
        text: newReceipt.text
    })
    return receiptToCreate.save()

}

function updateReceipt(id, updatedReceipt) {
    return Receipt.findById(id)
        .then(receipt => {
            if (!receipt) {
                return null
            }
            receipt.text = updatedReceipt.text;
            return receipt.save()
        })
}

module.exports = {
    updateReceipt,
    fetchReceipts,
    fetchReceiptById,
    deleteReceipt,
    createReceipt
}