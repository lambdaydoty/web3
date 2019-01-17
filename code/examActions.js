const traceVm = require('./traceVm.js')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider())

/*
 * Usage:
 *
 *    const examActions = require('examActions.js')
 *    network = 'testnet'
 *    address = '0xaF386d520D65fA60473cd893845d53e77a3A9DF6'
 *    txhash = '0xb774ca016d89e5275a586e9a41293640ee7369ee8c24486786667881a9e74b8c'
 *    examActions(network)(address)(txhash)
 *      .then(x => result = x)
 *
 */

module.exports = network => address => txhash => {
  address = address.toLowerCase()

  function byAddress (x) {
    return x.action
      && x.action.to
      && x.action.to.toLowerCase() === address
  }

  function extract ({
    action: { callType, from, gas, input, to, value },
    transactionHash,
    subtraces,    // # of chilren within this action
    traceAddress, // array of indices action sequence
    type,
  }) {
    return {
      id: transactionHash,
      address: to.toLowerCase(),
      amount: web3.utils.fromWei(value, 'ether'),
      traceAddress: traceAddress.join('.'),
      // tag: null,
      // fee: null,
      // gasPrice: null,
      input,
      type,
    }
  }

  return traceVm(network, txhash)
    .then(actions => {
      if (!actions) {
        return []
      }
      return actions
        .filter(byAddress)
        .map(extract)
    })
    .catch(console.log)
}
