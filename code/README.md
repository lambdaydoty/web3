# Usage

## Exam Actions
```js
const examActions = require('./code/examActions')

const data = {
  txhash: "0x4ea1a85ee3ca606005a4d4dd6b1639bf0060f15f2c43d99e3d9045b7025bf313",
  address: "0xaF386d520D65fA60473cd893845d53e77a3A9DF6",
  network: "testnet"
}

const result = examActions(network)(address)(txhash)

/* 
 * => {
 *    id: '0x...',
 *    address: ...,
 *    amount: ...,
 *    traceAddress: ...,
 *    ...
 * }
 *
 */
```
