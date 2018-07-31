var constant = require('./constant.js');
//------------------------
// Web3 Connect
//------------------------
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const mainAddress = constant.mainAddress;
const makerAddress = constant.makerAddress;
const eoaAddress = constant.eoaAddress;
const TokenContractAddress = constant.TokenContractAddress;
const crowdFundContractAddress = constant.crowdFundContractAddress;

//------------------------
// Smart Contract Connect
//------------------------
// Token Contract
var walletTokenAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            },
            {
                "name": "decimalUnits",
                "type": "uint8"
            },
            {
                "name": "initialSupply",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];
var TokenContract = web3.eth.contract(walletTokenAbi).at(TokenContractAddress);

// crowdFund Contract
var crowdFundAbi = [
    {
        "constant": false,
        "inputs": [],
        "name": "checkGoalReached",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "backer",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "isContribution",
                "type": "bool"
            }
        ],
        "name": "FundTransfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "beneficiaryAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amountRaisedValue",
                "type": "uint256"
            }
        ],
        "name": "GoalReached",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "safeWithdrawal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "name": "ifSuccessfulSendTo",
                "type": "address"
            },
            {
                "name": "fundingGoalInEthers",
                "type": "uint256"
            },
            {
                "name": "durationInMinutes",
                "type": "uint256"
            },
            {
                "name": "etherCostOfEachToken",
                "type": "uint256"
            },
            {
                "name": "addressOfTokenUsedAsReward",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "amountRaised",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "beneficiary",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "crowdsaleClosed",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "deadline",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "fundingGoal",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "fundingGoalReached",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "price",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "tokenReward",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
var CrowdFundContract = web3.eth.contract(crowdFundAbi).at(crowdFundContractAddress);

web3.eth.defaultAccount = web3.eth.accounts[0];

//-------------------------------------
// GetToken  (TokenContract : BalanceOf)
//-------------------------------------
exports.getTokenAmount = function (address) {
    //+++++++  STEP 4. Get 실습 ++++++++++++
    //return -1;
    return TokenContract.balanceOf(address);
};

//-------------------------------------
// getEther (CrowdFund : BalanceOf)
//-------------------------------------
exports.getFundAmount = function (address) {
    //+++++++  STEP 4. Get Exercise ++++++++++++
    //return -2;
    return CrowdFundContract.balanceOf(address);
};

//-------------------------------------
// getEther (Web3)
//-------------------------------------
exports.getBalance = function (address) {
    //+++++++  STEP 4. Get Exercise ++++++++++++
    //return -3;
    return web3.fromWei(web3.eth.getBalance(address), 'ether');
};

//----------------------------
// unlockAccount (Web3)
//----------------------------
exports.unlockAccount = function (from, passphase, callback) {
    web3.personal.unlockAccount(from, passphase, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* unlock : " + from + ', ' + passphase );
            return callback(null, hash);
        }
    });
};

//----------------------------
// sendTransaction (Web3)
//----------------------------
exports.sendTransaction = function(from, to, value, gas, callback) {
    //+++++++  STEP 4. SET Exercise ++++++++++++
    web3.eth.sendTransaction({
        to: to,
        from: from,
        value: web3.toWei(value,'ether'),
        gas: gas}, function (err, hash) {
        if (err) {
            console.log(err);
            return callback(err, '');
        } else {
            console.log("* sendTransaction txhash : " + hash );
            return callback(null, hash);
        }
    });
};

//----------------------------
// sendTransaction (Web3)
//----------------------------
exports.safeWithdraw = function(callback) {
  //+++++++  STEP 4. SET Exercise ++++++++++++
  CrowdFundContract.safeWithdrawal(
    function (err, hash) {
        if (err) {
          console.log(err);
          return callback(err, '');
        } else {
          console.log("* safeWithdrawl txhash : " + hash);
          return callback(null, hash);
        }
    }
  );
};

//----------------------------
// Event Monitoring (CrowdFund)
//----------------------------
exports.fundTransferEvent = function( callback ) {
    //+++++++  STEP 5. Event Watch Exercise ++++++++++++
    //return callback(null,null);
    CrowdFundContract.FundTransfer().watch(function(err, res){
        if (err)
        {
            console.log(err);
            return callback(err, '');
        } else
        {
            console.log(res);
            return callback(null, res);
        }
    });
};
