
const mongoose = require("mongoose");
const User = mongoose.model('User');

function getUsers(){
    return User.find({}).exec();
}

function createUser(userToCreate){
    let temporaryPassword = [];

    for (let i = 0; i < 8; i++) {
        temporaryPassword.push(Math.random()*1000000)
    }

    const newUser = new User({
        name: userToCreate.name,
        surname: userToCreate.surname,
        email: userToCreate.email,
        temporaryPassword: temporaryPassword.toString()
    })


    return newUser.save();
}
module.exports = {
    getUsers,
    createUser
}