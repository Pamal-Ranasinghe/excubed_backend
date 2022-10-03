const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');

/**
 * This function is used to transfer money from one account to another
 * @param {account_balance_from, account_balance_to, amount} req 
 * @param {data} res 
 */
const doTranscation = async (req, res) => {
    try{
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
    } catch(error) {
        res.status(500).send({error: error.message});
    }

    
}

/**
 * This function is used to fetch all the done transactions
 * @param {account_number} req 
 * @param {data} res 
 */
const fetchDoneTransactions = async (req, res) => {
    try{
        let {account_number} = req.body;
        await Transaction.find({account_number_from: account_number})
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    }catch(error){
        res.status(500).send({error: error.message});
    }
    
}

/**
 * This function is used to fetch all the got transactions
 * @param {account_number} req 
 * @param {data} res 
 */
const fetchGotTransactions = async (req, res) => {
    try{        
        let {account_number} = req.body;
        await Transaction.find({account_number_to: account_number})
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    } catch(error) {
        res.status(500).send({error: error.message});
    }
    
}
module.exports = {doTranscation, fetchDoneTransactions, fetchGotTransactions};