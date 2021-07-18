var sdk = require('./sdk.js');
var express = require('express');
var app = express();
var user = require('./router/user');

module.exports = function(app) {
    app.get('/api/Mint', function (req, res) {
        var amount = req.query.amount;
        let args = [amount];
        sdk.send(true, 'Mint', args, res);
    }); 
    
    app.get('/api/Burn', function (req, res) {
        var amount = req.query.amount;
        let args = [amount];
        sdk.send(true, 'Burn', args, res);
    });
    
    app.get('/api/Transfer', function (req, res) {
        var recipient = req.query.recipient;
        var amount = req.query.amount;
        let args = [recipient, amount];
        sdk.send(true, 'Transfer', args, res);
    });
    
    app.get('/api/ClientAccountBalance', function (req, res) {
        let args = [];
        sdk.send(false, 'ClientAccountBalance', args, res);
    });
    
    app.get('/api/ClientAccountID', function (req, res) {
        let args=[];
        sdk.send(false, 'ClientAccountID', args, res);
    });


    app.get('/', function (req, res) {
        res.redirect('/signin');
    });
    
    app.get('/signin', (req,res) => {
        var output = `
            <h1>Sign In</h1>
            <form action="/signin" method="POST">
                <p>
                    <input type="text" id="username" name="username" placeholder="username">
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="password">
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `;
        res.send(output);
    });
    
    app.post('/signin', user.login)
    
    app.get('/adduser', (req,res) => {
        var output = `
            <h1>Sign Up</h1>
            <form action="/adduser" method="POST">
                <p>
                    <input type="text" id="username" name="username" placeholder="username">
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="password">
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        `;
        res.send(output);
    });
    
    app.post('/adduser', user.adduser)
}
