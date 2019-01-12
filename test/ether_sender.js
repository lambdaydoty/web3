/* global artifacts:false */
/* global contract:false */
/* global beforeEach, describe, it */
/* global web3 */
const EtherSender = artifacts.require('EtherSender')
const { BigNumber } = require('../code/helpers.js')
require('dotenv')
  .config()
require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('EtherSender', function ([admin, receiver]) {
  beforeEach(async function () {
    this.contract = await EtherSender.new()
  })

  describe('', function () {
    it('has an owner', async function () {
      (await this.contract.owner()).should.be.equal(admin)
    })
  })

  describe('when sending ether to the contract', function () {
    beforeEach(async function () {
      let tx = {
        from: admin,
        to: this.contract.address,
        value: web3.utils.toWei('0.005'),
      };
      await web3.eth.sendTransaction(tx)
      // console.log({ log })
    })
    it('should have the proper amount of ether', async function () {
      (await web3.eth.getBalance(this.contract.address))
        .should.be.equal(web3.utils.toWei('0.005'))
    })

    describe('when stealing ether from the contract', function () {
      beforeEach(async function () {
        let to = receiver
        let amount = web3.utils.toWei('0.001')
        this.balance0 = await web3.eth.getBalance(receiver)
        let log = await this.contract.steal(to, amount, 1)
        // console.log({ log })
      })
      it('should send the proper amount of ether to the receiver', async function () {
        this.balance1 = (await web3.eth.getBalance(receiver))
        new BigNumber(this.balance1)
          .minus(this.balance0)
          .should.be.bignumber.equal(web3.utils.toWei('0.001'))
      })
    })
  })
})
