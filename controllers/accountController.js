const Account = require('../models/accountModel');

/**
 * This function for creating an account
 * @param {*} req 
 * @param {*} res 
 */
const addAccount = async (req, res) => {
    try{        
        if(req.body) {
            const account = new Account(req.body);
            await account.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
        }
    } catch(error){
        res.status(500).send({error: error.message});
    }
}

const getAccounts = async (req, res) => {
    try{        
        await Account.find({})
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        });
    } catch(error){
        res.status(500).send({error: error.message});
    }
}

const updateAccount = async(req,res) => {
    try{        
        if(req.params && req.body) {
            await Account.findByIdAndUpdate(req.params.id, req.body, {new: true})
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

const deleteAccount = async(req,res) => {
    try{        
        if(req.params) {
            await Account.findByIdAndDelete(req.params.id)
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

module.exports = {addAccount, getAccounts, updateAccount, deleteAccount};