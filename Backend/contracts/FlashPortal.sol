// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract FlashPortal {
    struct Member {
        address member;
        string nickName;
        uint256 flash;
    }

    uint256 totalFlash;
    mapping(address => Member) MemberSquad;

    constructor() {
        console.log("Yo yo, flash me");
    }

    function flash(string memory _nickname) public {
        totalFlash++;
        Member storage m = MemberSquad[msg.sender];
        m.member = msg.sender;
        m.nickName = _nickname;
        m.flash++;
        // console.log(
        //     "Address %s with Nickname %s has flashed!",
        //     msg.sender,
        //     _nickname
        // );
    }

    function getTotalFlash() public view returns (uint256) {
        // console.log("We have %d total Flash!", totalFlash);
        return (totalFlash);
    }

    function getFlasher() public view returns (Member memory mm) {
        mm = MemberSquad[msg.sender];

        return mm;
    }
}
