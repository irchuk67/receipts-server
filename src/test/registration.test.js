const mockingoose = require('mockingoose');
const UserModel = require('../models/User');
const {getUsers, createUser} = require('../services/userService')

describe("User service", () => {
    describe("Fetch users", () => {
        test('should return list of users', async () => {
            mockingoose(UserModel).toReturn([
                {
                    "_id": "638a140e405382715fe8606f",
                    "name": "Iryna",
                    "surname": "Sadovska",
                    "email": "abc@gmail.com"
                },
                {
                    "_id": "638c7870181a52e20b4307a3",
                    "name": "abs",
                    "surname": "ABC",
                    "email": "abc@gmail.com"
                }
            ], "find")
            const result = await getUsers();
            expect(result[0].name).toBe('Iryna')
        })
    })

    describe("Create new user", () => {
        test("should create user", async () => {
            const newUser =
                {
                    "name": "I",
                    "surname": "am",
                    "email": "Im@gmail.com"
                };

            const createdUser = await createUser(newUser);

            expect(createdUser.name).toBe(newUser.name);
            expect(createdUser.temporaryPassword).toBeDefined()
        })
    })
})