const assert = require('assert');
const { createPrivateKey } = require('crypto');
const ganache = require('ganache-cli'); // my local network
const Web3 = require('web3'); //Web3 is with big W while this will refer to a constructor.

// web3 we can different instances for the Web3 so we can connect to different networks in the ethureum network

// provider is the communication layer between a ethereum layer and web3 

//const web3 = new Web3(ganache.provider()); 

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface , bytecode } = require('../compile'); 

let accounts;
let inbox;
const INITIAL_MESSAGE = 'hi there!';

beforeEach( async ()=> {
/*     web3.eth.getAccounts().then( fetchedAccounts => {
        console.log(fetchedAccounts);
    }); */
// get list of all accounts
    accounts = await web3.eth.getAccounts();
//use one of those accounts to deploy the contract

inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : bytecode , arguments: [INITIAL_MESSAGE] })
    .send({ from : accounts[0], gas: '1000000' })


    inbox.setProvider(provider);

});

describe('Inbox', ()=>{
        it('deploys a contract ', ()=>{
            assert.ok(inbox.options.address);
        });
        it('it has a default message',async ()=>{
         const message = await inbox.methods.message().call();
         assert.equal(message , 'hi there!');
        });
        it('can we change the initial message ? ', async ()=>{
             await inbox.methods.setMessage('something different').send({ from : accounts[0]});
            const message = await inbox.methods.message().call();
            assert.equal(message, 'something different')

        })

});