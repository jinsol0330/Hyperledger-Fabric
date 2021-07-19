'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
var user = require('./router/user');
const { Wallets, Gateway } = require('fabric-network');


async function send(type, func, args, res) {
    var userid = user.userid;
    // console.log(user.userid);
    if (userid == 'jinsol') {
        const wallet = await Wallets.newFileSystemWallet('../../wallet');
        const gateway = new Gateway();

        try {
            const userName = 'jinsol';
            let connectionProfile = yaml.safeLoad(fs.readFileSync('../../gateway/connection-org1.yaml', 'utf8'));
            let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled:true, asLocalhost: true }
            };

            await gateway.connect(connectionProfile, connectionOptions);
            const network = await gateway.getNetwork('mychannel');
            const contract = await network.getContract('token_erc20');

            if(type) {
                await contract.submitTransaction(func, ...args);
                console.log('Transaction has been submitted.');
                await gateway.disconnect();
                res.send('Success');
            } else {
                const result = await contract.evaluateTransaction(func, ...args);
                console.log(`Transaction has been evaluated, result is : ${result}`);
                res.send(result);
            }
        } catch (error) {
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
            res.send(`Failed to submit transaction : ${error}`);
        }
    }

    if (userid == 'yulhee') {
        const wallet = await Wallets.newFileSystemWallet('../../../yh/wallet');
        const gateway = new Gateway();

        try {
            const userName = 'yulhee';
            let connectionProfile = yaml.safeLoad(fs.readFileSync('../../../yh/gateway/connection-org2.yaml', 'utf8'));
            let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled:true, asLocalhost: true }
            };

            await gateway.connect(connectionProfile, connectionOptions);
            const network = await gateway.getNetwork('mychannel');
            const contract = await network.getContract('token_erc20');

            if(type) {
                await contract.submitTransaction(func, ...args);
                console.log('Transaction has been submitted.');
                await gateway.disconnect();
                res.send('Success');
            } else {
                const result = await contract.evaluateTransaction(func, ...args);
                console.log(`Transaction has been evaluated, result is : ${result}`);
                res.send(result);
            }
        } catch (error) {
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
            res.send(`Failed to submit transaction : ${error}`);
        }
    }   
}

module.exports = {
    send:send
}