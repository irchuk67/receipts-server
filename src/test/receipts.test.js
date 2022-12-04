const receipts = require('../routes/api/receipts')
const mockingoose = require('mockingoose');
const ReceiptModel = require('../models/Receipt');

describe('Receipts test', () =>{
    it('Get receipts', async () => {
        mockingoose(ReceiptModel).toReturn([
            [
                {
                    "id": "632b630d23d6019843978ec5",
                    "text": "new value"
                },
                {
                    "id": "632b667b092565670c0d5a7a",
                    "text": "receipt6413"
                },
                {
                    "id": "632dceca252295cb2b93b616",
                    "text": "look on your plan2"
                },
                {
                    "id": "63485695b34189c2d7b798ce",
                    "text": "newRec1324"
                },
                {
                    "id": "634856b9b34189c2d7b798d0",
                    "text": "look here"
                },
                {
                    "id": "634856e8b34189c2d7b798d7",
                    "text": "read"
                }
            ]
        ])
        const result = await receipts.get('/');
        console.log(result)
    })
})