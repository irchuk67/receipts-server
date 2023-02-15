const receiptService = require('../services/receiptService');

let getAllReceipts = async () => {
    let receipts = await receiptService.fetchReceipts();
    let receiptNumber = 1;
    let formattedReceipts = receipts.map(receipt => {
            let receiptObject = {
                id: receipt._id,
                text: receipt.text,
                receiptNumber: receiptNumber
            };
            receiptNumber++;
            return receiptObject;
        }
    )
    return formattedReceipts
}

let createReceipt = async (reqBody) => {
    return await receiptService.createReceipt(reqBody);
}

let updateReceipt = async (id, updatedReceipt) => {
    return await receiptService.updateReceipt(id, updatedReceipt)
}

let deleteReceipt = async (id) => {
    let isDeleted = await receiptService.deleteReceipt(id);
    return isDeleted.acknowledged;
}
module.exports = {
    getAllReceipts,
    createReceipt,
    updateReceipt,
    deleteReceipt
}