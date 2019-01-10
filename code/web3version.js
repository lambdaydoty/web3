/* global web3 */

/*
 * Usage:
 * [bash] truffle exec web3version.js --network cli
 * [vim] :Dispatch truffle exec % --network cli
 */

module.exports = function (callback) {
  console.log(`web3: ${web3.version}`)
  callback()
}
