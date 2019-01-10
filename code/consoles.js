// module.exports = {
//   toNumber,
//   toFormat,
//   sideEffect,
//   first,
//   rest,
// }

module.exports = host => {
  host.toNumber = bn => bn.toNumber()
  host.toFormat = bn => bn.toFormat()
  host.save = name => x => { host[name] = x; return x }
  host.sideEffect = fn => x => { fn(x); return x }
  host.first = ([x, ...y]) => x
  host.rest = ([x, ...y]) => y

  host.abiDecoder = require('abi-decoder')

  return host.web3.version
}
