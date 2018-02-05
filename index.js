const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config');

const createUserModel = require('./model/user');
const createUserHandler = require('./handlers/user');
const createAuthModel = require('./model/auth');
const createAuthHandler = require('./handlers/auth');

const app = express();
const dbConnection = mysql.createConnection(config);

// Define models
const userModel = createUserModel(dbConnection);
const authModel = createAuthModel(dbConnection);
// Define handlers
const userHandler = createUserHandler(userModel);
const authHandler = createAuthHandler(authModel);
//middleware
app.use(bodyParser.json());

app.use('/users', userHandler);
app.use('/login', authHandler);
app.get('/', (req, res) => res.send('hello word'));

app.listen(3000, err => {
    if (err) return console.log('server gak hidup');
    return console.log('server hidup');
});