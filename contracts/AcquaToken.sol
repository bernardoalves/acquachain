// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.7/contracts/token/ERC20/ERC20.sol";

contract AcquaToken is ERC20 {
    constructor() ERC20("AcquaToken", "ACQUA") {}

    function mint(address _to, uint _amount) external {
        _mint(_to, _amount);
    }

    function burn(address _to, uint _amount) external {
        _burn(_to, _amount);
    }

    function transfer(
        uint256 _amount,
        address _sender,
        address _recipient
    ) external returns (bool) {
        _transfer(_sender, _recipient, _amount);
        return true;
    }
}
