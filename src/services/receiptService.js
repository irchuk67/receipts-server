const mongoose = require('mongoose');
const Receipt = mongoose.model('Receipt');

/**
 * <h2>Get list of receipts</h2>
 *
 * This method queries the mongoDB to find list of all objects written by Receipt schema
 *
 * @returns list of {@link Receipt}
 * @author Iryna Sadovska
 * */
function fetchReceipts(){
    return Receipt.find({})
}

/**
 * <h2>Get receipt by id</h2>
 *
 * This method queries the mongoDB to find receipt objects with given id
 *
 * @param {number} id Receipt id to find
 * @returns {@link Receipt} by given id
 * @author Iryna Sadovska
 * */
function fetchReceiptById(id){
    return Receipt.findById(id)
}

/**
 * <h2>Delete receipt</h2>
 *
 * This method queries the mongoDB to find receipt by id and delete it
 *
 * @param {number} id Receipt id to delete
 * @returns {null} if receipt wasn`t found || object { acknowledged: true, deletedCount: {@link number} }
 * @author Iryna Sadovska
 * */
function deleteReceipt(id){
    return Receipt.findById(id).then(response => {
        if (!response) return null;
        else {
            return Receipt.deleteOne(response)
                .catch(err => console.log(err))
        }
    })
}

/**
 * <h2>Create new receipt</h2>
 *
 * This method queries the mongoDB to save new receipt
 *
 * @param {object} newReceipt Object that fields will be written to new {@link Receipt}
 * @returns {@link Receipt} that was created
 * @author Iryna Sadovska
 * */
function createReceipt(newReceipt){
    const receiptToCreate = new Receipt({
        text: newReceipt.text
    })
    return receiptToCreate.save()

}

/**
 * <h2>Update receipt</h2>
 *
 * This method queries the mongoDB to find receipt by id and update it
 *
 * @param {number} id Receipt id to update
 * @param {object} updatedReceipt Object that fields will be written to found by id {@link Receipt}
 * @returns {null} if receipt wasn`t found || saved updated object
 * @author Iryna Sadovska
 * */
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