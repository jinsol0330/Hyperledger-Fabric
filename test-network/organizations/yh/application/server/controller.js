var sdk = require('./sdk.js');
var id = 2
module.exports = function(app) {
    
    app.get('/api/Transfer', function (req, res) {
        var recipient = req.query.recipient;
        var amount = req.query.amount;
        let args = [recipient, amount];
        sdk.send(id, true, 'Transfer', args, res);
    });
    
    app.get('/api/ClientAccountBalance', function (req, res) {
        let args = [];
        sdk.send(id, false, 'ClientAccountBalance', args, res);
    });
    
    app.get('/api/ClientAccountID', function (req, res) {
        let args=[];
        sdk.send(id, false, 'ClientAccountID', args, res);
    });
}
