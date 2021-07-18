/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');

// Main program function
async function main() {
    // A wallet stores a collection of identities for use
    const wallet = await Wallets.newFileSystemWallet('../wallet');
    

    // A gateway defines the peers used to access Fabric networks
    const gateway = new Gateway();

    // Main try/catch block
    try {
        const userName = 'jinsol';

        // Load connection profile; will be used to locate a gateway
        let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org1.yaml', 'utf8'));

        // Set connection options; identity and wallet
        let connectionOptions = {
            identity: userName,
            wallet: wallet,
            discovery: { enabled:true, asLocalhost: true }
        };

        // Connect to gateway using application specified parameters
        console.log('1. Connect to Fabric gateway.');

        await gateway.connect(connectionProfile, connectionOptions);

        // Access token_erc20 network
        console.log('2. Use network channel: mychannel.');

        const network = await gateway.getNetwork('mychannel');

        // Get addressability to token_erc20 contract
        console.log('3. Use token_erc20 smart contract.');

        const contract = await network.getContract('token_erc20');
        const amount = process.argv[2];
        
        // mint token
        console.log('4. Submit Mint transaction.');

        const mintResponse = await contract.submitTransaction('Mint', amount);

        console.log(`Transaction has been evaluated, result : Mint ${amount}`);

        console.log('5. Transaction complete.');

    } catch (error) {

        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);

    } finally {

        // Disconnect from the gateway
        console.log('6. Disconnect from Fabric gateway.');
        gateway.disconnect();

    }
}
main().then(() => {

    console.log('7. Mint program complete.');

}).catch((e) => {

    console.log('Mint program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});
