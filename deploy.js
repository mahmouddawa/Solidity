const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
// the interface is our ABI it is the translation layer that communicates data from the network over to javascript.
//bytecode is the compiled code. 

const provider = new HDWalletProvider( 
    'glory proof clock oyster install spider limit poem fish discover still scheme',
    'https://rinkeby.infura.io/v3/861278af7bb24d3a9ec2ce25c59f9ea3'
);

const web3 = new Web3(provider);

// the only reason we build this function is to use the async--await 
const depoly = async () =>{
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account ', accounts[0]);
    
    const resault = await new web3.eth.Contract(JSON.parse(interface))
    .deploy( {data: bytecode , arguments : ['Hi there!']})
    .send({ from : accounts[0] , gas: '1000000'})
    console.log('Contract deployed to', resault.options.address);
};
depoly();