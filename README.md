# Web3/Smart-Contract Matrix Project

## Instructions
```bash
git clone <repo-url>
cd <repo-dir>
npm install
truffle version
truffle init --force
```

## New Artifacts
```bash
truffle create contract EtherSender
truffle create migration EtherSender
truffle create test EtherSender
```

## Interactions
vim
```
w | Dispatch truffle compile
w | Dispatch truffle test % | grep .
```
bash
```bash
truffle exec code/web3version.js --network cli
```
