const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://receipts:receipts@localhost:27017/receipts');
console.log(process.env.MONGODB_URI)
require('../models/Receipt')
require('../models/User')
const CLIController = require('./CLIController')

let handleShowAllPrescriptions = async () => {
    let receipts = await CLIController.getAllReceipts();
    receipts.map(receipt => {
        console.log(`${receipt.receiptNumber}. ${receipt.text}`)
    })
    rl.question('Want to update or delete any prescription(1) or add a new one(2)?\n', (answer) => {
        if (answer === '1') {
            rl.question("Enter the number of prescription, you want to perform: ", (number) => {
                let receipt = receipts.filter(receipt => receipt.receiptNumber === parseInt(number, 10))
                rl.question("Select operation" + "\n1. Update prescription" + "\n2. Delete prescription\n", async (answer) => {
                    if (answer === "1") {
                        rl.question("Please, enter updated prescription text: ", async text => {
                            let updatedReceipt = await CLIController.updateReceipt(receipt[0].id, {text: text})
                            if (updatedReceipt) {
                                console.log('Prescription was successfully updated')
                            }
                            startApplication();
                        })

                    } else if (answer === "2") {
                        let isDeleted = await CLIController.deleteReceipt(receipt[0].id);
                        if (isDeleted) {
                            console.log('Receipt was successfully deleted');
                        }
                        startApplication();
                    }
                })
            })
            
        } else if (answer === '2') {
            rl.question('Please, enter receipt text: ', async (answer) => {
                let newReceipt = await CLIController.createReceipt({text: answer})
                console.log("Receipt was successfully created.");
                startApplication();

            })
        }
    })
}

let handleCreateNewPrescription = () => {
    rl.question('Please, enter receipt text: ', async (answer) => {
        let newReceipt = await CLIController.createReceipt({text: answer})
        console.log("Receipt was successfully created.");
        startApplication();
    })
}

function startApplication() {
    rl.question(
        "Please, select what action you want to run:" +
        "\n1. Show all prescriptions" +
        "\n2. Create new prescription" + "\nYou select action number: ",
        async (answer) => {
            if (answer === '1') {
                await handleShowAllPrescriptions();
            } else if (answer === '2') {
                await handleCreateNewPrescription();
            }
        }

    )


}

startApplication();
