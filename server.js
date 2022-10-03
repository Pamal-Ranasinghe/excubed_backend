const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const AccountAPI = require('./api/accountApi');
const transactionAPI = require('./api/transactionApi');

dotenv.config();
const app = express();   

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI, {
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false
}, (error) => {
    if (error) {
        console.log(error);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database connected');
});

app.route('/').get((req,res) => {
    res.send('Test route');
});

app.use('/account', AccountAPI());
app.use('/transaction', transactionAPI());

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    }
    // console.log(`error occured: ${error}`);
});