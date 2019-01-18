require('dotenv').config()
const abiDeocder = require('abi-decoder')
const erc20abi = require('human-standard-token-abi')

/**
 * Contract ABI spec:
 *
 *  https://solidity.readthedocs.io/en/develop/abi-spec.html
 *
 * Example Abi:
 *  let abi_json = `./Mobro.json`
 *  Promise.resolve(abi_json)
 *    .then(pify(fs.readFile))
 *    .then(JSON.parse)
 *    .then(({abi}) => motabi = abi)
 */

// module.exports = (
//   { input, log },
//   abi = erc20abi
// ) => {
//   abiDeocder.addABI(abi)
//   if (input !== undefined) {
//     return abiDeocder.decodeMethod(input)
//   }
//   if (log !== undefined) {
//     return abiDeocder.decodeLog(log)
//   }
//   return {}
// }

module.exports = signature
function signature (name, ...types) {
  const Web3 = require('web3')
  const web3 = new Web3()
  return web3.utils.sha3(
    `${name}(${types.join()})`
  ).slice(0, 10)
}

