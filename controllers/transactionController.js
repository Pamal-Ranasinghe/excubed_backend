const Transaction = require('../models/transactionModel');

const doTranscation = async (req, res) => {
    if(req.body) {
        const transaction = new Transaction(req.body);
        await transaction.save()
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

module.exports = {doTranscation};