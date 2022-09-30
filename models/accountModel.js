const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    account_number: {type: String, required: true},
    account_name: {type: String, required: true},
    account_type: {type: String, required: true},
    account_balance: {type: Number, required: true},
    account_currency: {type: String, required: true},
    owner_name: {type: String, required: true},
});

const Account = mongoose.model('accounts', AccountSchema);
module.exports = Account;