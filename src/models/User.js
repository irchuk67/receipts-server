const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    temporaryPassword: String
}, {collection: 'User', versionKey: false})

UserSchema.methods.toJSONFor  = function (){
    return {
        id: this._id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        temporaryPassword: this.temporaryPassword
    }
}
module.exports = mongoose.model('User', UserSchema)