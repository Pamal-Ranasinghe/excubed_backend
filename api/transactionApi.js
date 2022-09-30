const express = require('express');
// const { addAccount } = require('../controllers/accountController');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

module.exports =  () => {
    router.post('/do-transaction', TransactionController.doTranscation);    
    router.get('/get-transactions-by-account-done', TransactionController.fetchDoneTransactions);
    router.get('/get-transactions-by-account-got', TransactionController.fetchDoneTransactions);
    return router;
}
