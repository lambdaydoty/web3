module.exports = {

  sideEffect: fn => x => {
    fn(x)
    return x
  },
  first: ([x, ...y]) => x,
  rest: ([x, ...y]) => y,

  dotenv: require('dotenv'),

  BigNumber: require('bignumber.js'),
  abiDecoder: require('abi-decoder'),
  erc20abi: require('human-standard-token-abi'),

}
