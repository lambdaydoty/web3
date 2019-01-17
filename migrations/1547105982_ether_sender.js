const EtherSender = artifacts.require('EtherSender')
const EtherSenderCaller = artifacts.require('EtherSenderCaller')
const {
  sideEffect,
  BigNumber,
} = require('../code/helpers.js')
module.exports = function (deployer, network, [admin]) {
  console.log({ network })
  console.log({ admin })
  // Use deployer to state migration tasks.
  return deployer
    .deploy(EtherSender)
    .then(() => deployer.deploy(EtherSenderCaller, EtherSender.address))
    .then(() => web3.eth.sendTransaction({
      from: admin,
      to: EtherSender.address,
      value: web3.utils.toWei('0.01'),
    }))
    .then(() => web3.eth.sendTransaction({
      from: admin,
      to: EtherSenderCaller.address,
      value: web3.utils.toWei('0.01'),
    }))
    .then(console.log)
    .catch(console.log)
};
