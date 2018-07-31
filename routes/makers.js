var constant = require('../dapp/constant.js');
var eth = require('../dapp/eth.js');

var express = require('express');
var router = express.Router();

//----------------------------
//  Makers Main Screen
//----------------------------
router.get('/', function(req, res, next) {
    var fund_balance = eth.getBalance(constant.crowdFundContractAddress);
    var fund_tamount = eth.getTokenAmount(constant.crowdFundContractAddress); // token balanceof

    var maker_balance = eth.getBalance(constant.makerAddress);
    var maker_tamount = eth.getTokenAmount(constant.makerAddress);  // token balanceof

    res.render('makers', {maker : constant.makerAddress, maker_balance : maker_balance, maker_tamount : maker_tamount,
                          fund : constant.crowdFundContractAddress, fund_balance:fund_balance, fund_tamount:fund_tamount});
});

//----------------------------
//  Withdraw Input Screen
//----------------------------
router.get('/withdraw', function(req, res, next) {
  var fund_balance = eth.getBalance(constant.crowdFundContractAddress);

  res.render('withdraw', { maker : constant.makerAddress,
                           fund : constant.crowdFundContractAddress,
                           fund_balance : fund_balance});
});

//----------------------------
//  Withdraw Action
//----------------------------
router.post('/withdraw', function(req, res, next) {
  var passphase = req.body.passphase;

  eth.unlockAccount(constant.mainAddress, passphase, checkUnlock);

  function checkUnlock(err, result) {
    if (err) {
      console.log(err);
      return callback(err);
    } else {
      eth.safeWithdraw(checkTransaction);
    }
  }

  function checkTransaction( err, result) {
    if(err) {
      console.log(err);
      return callback(err);
    } else {
      eth.fundTransferEvent(checkEvent);
    }
  }

  function checkEvent(err, result) {
    if(err) {
      console.log(err);
      return res.send(400);
    } else {
      try {
        res.redirect('/makers');
      } catch(e) {
      }
    }
  }

});


//----------------------------
//  Video Upload
//----------------------------
router.get('/movie', function(req, res, next) {
  res.render('movie');
});

module.exports = router;
