const express = require('express');
const { addAccount } = require('../controllers/accountController');
const router = express.Router();
const AccountController = require('../controllers/accountController');

module.exports =  () => {
    router.post('/create-account', AccountController.addAccount);
    router.get('/get-accounts', AccountController.getAccounts);
    router.put('/update-account/:id', AccountController.updateAccount);
    router.delete('/delete-account/:id', AccountController.deleteAccount);
    
    return router;
}
