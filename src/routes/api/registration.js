const express = require('express');
const router = express.Router();
const {getUsers, createUser} = require("../../services/userService")

router.get('/', async (req, res) => {
    let users = await getUsers();
    console.log(users)
    res.json(users).status(200);

});

router.use(express.json());

router.post('/registration', async (req, res) => {
    const newUser = await createUser(req.body)
    return res.status(201).json(newUser);
});

module.exports = router;
