// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FlashPortal {
    struct Member {
        address member;
        string nickName;
        string message;
        uint256 timestamp;
    }

    Member[] _member;

    uint256 totalFlash;

    constructor() {
        console.log("Yo yo, flash me");
    }

    function flash(string memory _nickname, string memory _message) public {
        totalFlash++;
        _member.push(Member(msg.sender, _nickname, _message, block.timestamp));
    }

    function getTotalFlash() public view returns (uint256) {
        // console.log("We have %d total Flash!", totalFlash);
        return (totalFlash);
    }

    function getFlasher() public view returns (Member[] memory) {
        return _member;
    }
}
