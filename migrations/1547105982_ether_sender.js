const EtherSender = artifacts.require('EtherSender')
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
    .then(sideEffect(x => { this.contract = x}))
    .then(contract => Promise.all([
      contract.address,
      contract.owner(),
    ]))
    .then(sideEffect(([address, owner]) => {  // send ether to the contract
      web3.eth.sendTransaction({
        from: admin,
        to: address,
        value: web3.utils.toWei('0.001'),
      })
    }))
    .then(console.log)
    .catch(console.log)
};
