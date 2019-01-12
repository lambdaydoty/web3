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
  return traceVm(network, txhash)
    .then(actions => {
      if (!actions) {
        return []
      }
      return actions
        .filter(x => x.action.to.toLowerCase() === address.toLowerCase())
        .map((
          {
            action: { from, gas, input, to, value },
            transactionHash,
          }) => ({
            id: transactionHash,
            address: to.toLowerCase(),
            tag: null,
            amount: web3.utils.fromWei(value, 'ether'),
            fee: null,
            gasPrice: null,
            input,
          })
        )
    })
    .catch(console.log)
}
