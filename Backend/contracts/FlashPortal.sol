// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

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
        console.log("Yo yo, I am a contract and I am smart");
    }

    function flash(string memory _nickname) public {
        totalFlash++;
        Member storage m = MemberSquad[msg.sender];
        m.member = msg.sender;
        m.nickName = _nickname;
        m.flash++;
        console.log(
            "Address %s with Nickname %s has flashed!",
            msg.sender,
            _nickname
        );
    }

    function getTotalFlash() public view returns (Member memory mm, uint256) {
        mm = MemberSquad[msg.sender];
        console.log("We have %d total Flash!", totalFlash);
        return (mm, totalFlash);
    }
}
