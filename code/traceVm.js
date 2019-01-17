/*
 * Usage:
 *
 *    const traceVm = require('traceVm.js')
 *    network = 'testnet'
 *    txhash = '0xb774ca016d89e5275a586e9a41293640ee7369ee8c24486786667881a9e74b8c'
 *    traceVm(network, txHash)
 *      .then(x => internals = x)
 *
 *    // example return: [ { action: ...}, { action: ...}, ...]
 *
 * Reference:
 *  https://github.com/paritytech/parity-ethereum/issues/9286
 */

module.exports = tracerRpc

function tracerRpc (network, txhash) {
  const pify = require('pify')
  const request = require('request')

  const url = {
    mainnet: `http://secret.garden`,
    testnet: `http://localhost:6545`,
  }
  const data = {
    method: "trace_transaction",
    "params": [ txhash ],
    "id": 1,
    "jsonrpc": "2.0",
  }
  const options = {
    uri: url[network],
    method: 'POST',
  }
  options.json = data

  return pify(request, { multiArgs: true })(options)
    .then(([httpResponse, body]) => {
      return body['result']
    })
    .catch(console.log)
}

function tracerWeb (network, txhash) {
  const pify = require('pify')
  const request = require('request')
  const { JSDOM } = require('jsdom')

  const errorMessage = 'The requested transaction hash does not exist.'
  const url = {
    mainnet: `https://etherscan.io/vmtrace?txhash=${txhash}&type=parity#raw`,
    testnet: `https://ropsten.etherscan.io/vmtrace?txhash=${txhash}&type=parity#raw`,
  }

  return pify(request, { multiArgs: true })(url[network])
    .then(([httpResponse, body]) => {
      if (body.includes(errorMessage)) {
        return null
      }
      const dom = new JSDOM(body)
      const element = dom.window.document.querySelector('#editor')
      const raw = `[ ${element.textContent.trim().replace(/\n/g, '')} ]` // add squares for parsing
      const result = JSON.parse(raw)
      return result
    })
    .catch(console.log)
}
