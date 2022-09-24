const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    text: String
}, {collection: 'Receipt', versionKey: false})

ReceiptSchema.methods.toJSONFor  = function (){
    return {
        id: this._id,
        text: this.text
    }
}
mongoose.model('Receipt', ReceiptSchema)