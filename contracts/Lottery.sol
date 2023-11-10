// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Lottery is VRFConsumerBase {
    address public manager;
    address payable[] public participants;
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory;

    bytes32 internal keyHash; 
    uint internal fee;        // fee to get random number
    uint public randomResult;
                                    //goerli test eth
    constructor()
        VRFConsumerBase(
            0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D, // VRF coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK token address
        ) {
            keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;//150 gwei Key Hash	
            fee = 0.25 * 10 ** 18;    // 0.25 LINK

            manager = msg.sender;
            lotteryId = 1;
        }

    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK in contract");
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 /*requestId*/, uint randomness) internal override {
        randomResult = randomness;
        payWinner();
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return lotteryHistory[lottery];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return participants;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        participants.push(payable(msg.sender));// address of player entering lottery
    }

    function pickWinner() public onlymanager {
        getRandomNumber();
    }

    function payWinner() public {
        uint index = randomResult % participants.length;
        participants[index].transfer(address(this).balance);

        lotteryHistory[lotteryId] = participants[index];
        lotteryId++;
        
        participants = new address payable[](0);// reset the state of the contract
    }

    modifier onlymanager() {
      require(msg.sender == manager);
      _;
    }
}