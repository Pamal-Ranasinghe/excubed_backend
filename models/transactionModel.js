const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    account_number_from: {type: String, required: true},
    account_number_to: {type: String, required: true},
    amount: {type: Number, required: true},
    time : { type : Date, default: Date.now }
});
const Transaction = mongoose.model('transactions', TransactionSchema);
module.exports = Transaction;