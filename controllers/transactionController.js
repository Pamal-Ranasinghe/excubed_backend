const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

const doTranscation = async (req, res) => {
    let {account_number_from, account_number_to, amount} = req.body;

    let account_balance_from = await Account.findOne({account_number: account_number_from}).select('account_balance');

    if(account_balance_from.account_balance < amount) {
        res.status(200).send({error: 'Insufficient balance'});
    } else {    
        let account_balance_to = await Account.findOne({account_number: account_number_to}).select('account_balance');

        let new_balance_from = account_balance_from.account_balance - amount;
        let new_balance_to = account_balance_to.account_balance + amount;

        await Account.findOneAndUpdate({account_number: account_number_from}, {account_balance: new_balance_from});
        await Account.findOneAndUpdate({account_number: account_number_to}, {account_balance: new_balance_to});

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

const fetchDoneTransactions = async (req, res) => {
    let {account_number} = req.body;
    let trans = await Transaction.find({account_number_from: account_number});
    // .then(data => {
    //     res.status(200).send({data: trans});
    // })
    // .catch(error => {
    //     res.status(500).send({error: error.message});
    // });
    res.status(200).send(trans);
}

const fetchGotTransactions = async (req, res) => {
    let {account_number} = req.body;
    let trans = await Transaction.find({"$ne" : {account_number_from: account_number}});
    // .then(data => {
    //     res.status(200).send({data: trans});
    // })
    // .catch(error => {
    //     res.status(500).send({error: error.message});
    // });
    res.status(200).send(trans);
}
module.exports = {doTranscation, fetchDoneTransactions, fetchGotTransactions};