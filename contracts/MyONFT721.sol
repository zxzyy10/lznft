// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { ONFT721 } from "@layerzerolabs/onft-evm/contracts/onft721/ONFT721.sol";

contract MyONFT721 is ONFT721 {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) ONFT721(_name, _symbol, _lzEndpoint, _delegate) {}
    function setMintAdmin(address _mintAdmin) external onlyOwner {
        mintAdmin = _mintAdmin;
    }

    // mint功能，只有mintAdmin可以执行
    function mint(address to, uint256 tokenId) external {
        require(msg.sender == mintAdmin, "Only mintAdmin can mint");
        _safeMint(to, tokenId);
    }
}
