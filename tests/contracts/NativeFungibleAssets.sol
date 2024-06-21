// SPDX-License-Identifier: OTHER
// This code is automatically generated

pragma solidity >=0.8.0 <0.9.0;

/// @dev common stubs holder
contract Dummy {
    uint8 dummy;
    string stub_error = "this contract is implemented in native";
}
contract ERC165 is Dummy {
    function supportsInterface(
        bytes4 interfaceID
    ) external view returns (bool) {
        require(false, stub_error);
        interfaceID;
        return true;
    }
}

/// @dev inlined interface
contract ERC20Events {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

/// @dev the ERC-165 identifier for this interface is 0x942e8b22
contract ERC20 is Dummy, ERC165, ERC20Events {
    /// @dev EVM selector for this function is: 0xdd62ed3e,
    ///  or in textual repr: allowance(address,address)
    function allowance(
        address owner,
        address spender
    ) public view returns (uint256) {
        require(false, stub_error);
        owner;
        spender;
        dummy;
        return 0;
    }
    /// @dev EVM selector for this function is: 0x095ea7b3,
    ///  or in textual repr: approve(address,uint256)
    function approve(address spender, uint256 amount) public returns (bool) {
        require(false, stub_error);
        spender;
        amount;
        dummy = 0;
        return false;
    }
    /// @dev EVM selector for this function is: 0x70a08231,
    ///  or in textual repr: balanceOf(address)
    function balanceOf(address owner) public view returns (uint256) {
        require(false, stub_error);
        owner;
        dummy;
        return 0;
    }
    /// @dev EVM selector for this function is: 0x313ce567,
    ///  or in textual repr: decimals()
    function decimals() public view returns (uint8) {
        require(false, stub_error);
        dummy;
        return 0;
    }
    /// @dev EVM selector for this function is: 0x06fdde03,
    ///  or in textual repr: name()
    function name() public view returns (string memory) {
        require(false, stub_error);
        dummy;
        return "";
    }
    /// @dev EVM selector for this function is: 0x95d89b41,
    ///  or in textual repr: symbol()
    function symbol() public view returns (string memory) {
        require(false, stub_error);
        dummy;
        return "";
    }
    /// @dev EVM selector for this function is: 0x18160ddd,
    ///  or in textual repr: totalSupply()
    function totalSupply() public view returns (uint256) {
        require(false, stub_error);
        dummy;
        return 0;
    }
    /// @dev EVM selector for this function is: 0xa9059cbb,
    ///  or in textual repr: transfer(address,uint256)
    function transfer(address to, uint256 amount) public returns (bool) {
        require(false, stub_error);
        to;
        amount;
        dummy = 0;
        return false;
    }
    /// @dev EVM selector for this function is: 0x23b872dd,
    ///  or in textual repr: transferFrom(address,address,uint256)
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        require(false, stub_error);
        from;
        to;
        amount;
        dummy = 0;
        return false;
    }
}

/// @dev the ERC-165 identifier for this interface is 0xd901570d
contract PermissionsExtensions is Dummy, ERC165, ERC20 {
    /// Change account permissions.
    ///
    /// Permissions bits.
    ///
    /// 1 bit: allow account to mint new tokens.
    /// 2 - 8 bits: reserved.
    /// @dev EVM selector for this function is: 0xd901570d,
    ///  or in textual repr: setAccountPermissions(address,uint64)
    function setAccountPermissions(address account, uint64 permissions) public {
        require(false, stub_error);
        account;
        permissions;
        dummy = 0;
    }
}

/// @dev the ERC-165 identifier for this interface is 0xee18d38e
contract XcmExtensions is Dummy, ERC165, ERC20 {
    /// @dev EVM selector for this function is: 0xee18d38e,
    ///  or in textual repr: crossChainTransfer(uint64,address,uint256)
    function crossChainTransfer(
        uint64 chainId,
        address receiver,
        uint256 amount
    ) public {
        require(false, stub_error);
        chainId;
        receiver;
        amount;
        dummy = 0;
    }
}

/// @dev the ERC-165 identifier for this interface is 0x40c10f19
contract ERC20Mintable is Dummy, ERC165, ERC20 {
    /// @dev EVM selector for this function is: 0x40c10f19,
    ///  or in textual repr: mint(address,uint256)
    function mint(address to, uint256 amount) public {
        require(false, stub_error);
        to;
        amount;
        dummy = 0;
    }
}

/// @dev the ERC-165 identifier for this interface is 0x3b5a0bf8
contract ERC20Burnable is Dummy, ERC165, ERC20 {
    /// @dev EVM selector for this function is: 0x42966c68,
    ///  or in textual repr: burn(uint256)
    function burn(uint256 value) public {
        require(false, stub_error);
        value;
        dummy = 0;
    }
    /// @dev EVM selector for this function is: 0x79cc6790,
    ///  or in textual repr: burnFrom(address,uint256)
    function burnFrom(address account, uint256 value) public {
        require(false, stub_error);
        account;
        value;
        dummy = 0;
    }
}

contract NativeFungibleAssets is
    Dummy,
    ERC165,
    ERC20,
    ERC20Burnable,
    ERC20Mintable,
    XcmExtensions,
    PermissionsExtensions
{}
