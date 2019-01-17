pragma solidity ^0.4.22;

import "contracts/EtherSender.sol";

contract EtherSenderCaller {
    EtherSender hook;

    constructor(EtherSender _hook) public {
        hook = _hook;
    }

    // if you want your contract to receive Ether, you have to implement a fallback function.
    function() public payable { }

    function doSomething(address to, uint amount)
        public
    {
        hook.steal(to, amount, 2);
        msg.sender.transfer(amount);
        to.transfer(amount);
    }
}
