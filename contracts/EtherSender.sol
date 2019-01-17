pragma solidity ^0.4.25;

// import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract EtherSender {
    constructor() public {
    }

    // if you want your contract to receive Ether, you have to implement a fallback function.
    function() public payable { }

    function steal(address to, uint amount, uint count)
        public
    {
        for (uint i = 0; i < count; i++) {
            to.transfer(amount);
        }
    }
}
