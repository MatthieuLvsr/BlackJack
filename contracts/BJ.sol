// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract BJ{
    uint entranceFee = 1 ether;

    address payable [] players;

    address public owner;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function entrance() external payable{
        require(msg.value >= entranceFee);
        players.push(payable(msg.sender));
    }

    constructor(){
        owner = msg.sender;
    }
}