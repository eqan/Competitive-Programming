// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// constants
// contract-owner : address , msg.sender
// commision: uint , between 1-5

// variables
// system-price : uint , default to 100
// last-token-id : uint , default to 0

// maps
// property (key: uint) (value: {price: uint, commision: uint})
// lease (key: uint) (value: {owner : address, timestamp: uint , price: uint, isPaid: bool})

interface IProperty {


    // price
    function setCommision(uint) external;
    // only contract-owner can set the commision
    // value must be >= 1 and <= 5

    // returns the contract-owner commision
    function getCommision() external view returns (uint);

    function setSystemPrice(uint) external;
    // only contract-owner can set the system price
    // value must be >= 100 and <= 1000

    // returns the system price
    function getSystemPrice() external view returns (uint);

    //  returns the price for a particular property
    function getPropertyPrice(uint) external view returns (uint);

    // id
    function getPropertyLeasePrice(uint) external view returns (uint);
    // returns the lease price for a particular property




    // contract-caller pays x eth to contract / address(this), where x = getSystemPrice()
    // contract-caller pays x commision to the contract owner, where x = getCommision()
    // property nft is bought for address supplied
    // update maps, variables
    function buy(address) external payable;

    // id, lessee, timestamp, price
    function giveLease(uint, address, uint, uint) external;
    // ensure timestamp is a future time
    // ensure price is > 0
    // nft owner transfers property nft to the contract/escrow/address(this) for the timestamp and price supplied 
    // update maps

    function claimLease(uint) external payable;
    // lessee transfers eth based on the lease price to the contract/escrow/address(this)
    // contract/escrow/address(this) transfers the payment to the owner and the nft to the lessee
    // update maps

    function completeLease(uint) external;
    // check if contract-caller is original owner
    // check if current time >= lease time
    // transfer nft from leasee back to owner
    // update maps

    // ID
    function cancelLease(uint256) external;
    // if lease is paid then deny
    // if contract-caller is not owner then deny
    // contract/escrow transfers nft back to contract-caller
    // update maps

    function getLastTokenId() external view returns (uint);
    // returns the last property nft id bought/minted

    function getOwner(uint) external view returns (address);
    // Owner of a given token identifier

    // id, reciever
    function transfer(uint, address) external;
    // if property is on lease then deny
    // if contract-caller is not owner deny
    // transfer nft from contract-caller to reciever
    // update maps
}

contract Property is IProperty{
    struct Lease{
        address to;
        uint start;
        uint end;
        uint leasePrice;
        bool cancel;
        bool paid;
    }

    struct PropertyNFT{
        address originalOwner;
        address owner;
        uint price;
        bool onLease;
    }

    uint commision = 0;
    uint systemPrice = 0;
    uint currentPropertId = 0;
    mapping(uint => PropertyNFT) property; // PropertyNFT ID => PropertyNFT
    mapping(uint => Lease) lease; // PropertyNFT Id => Lease
    address public owner;

    event Transfer(address from, address to, uint amount);

    // price
    function setCommision(uint _commision) external override{
        require(_commision >= 1 && _commision <= 5);
        commision = _commision;
    }
    // only contract-owner can set the commision
    // value must be >= 1 and <= 5

    // returns the contract-owner commision
    function getCommision() external view override returns (uint){
        return commision;
    }

    function setSystemPrice(uint _systemPrice) external override{
        require(_systemPrice >= 100 && _systemPrice <= 1000);
        systemPrice = _systemPrice;
    }
    // only contract-owner can set the system price
    // value must be >= 100 and <= 1000

    // returns the system price
    function getSystemPrice() external view override returns (uint){
        return systemPrice;
    }

    //  returns the price for a particular property
    function getPropertyPrice(uint _propertyId) external view override returns (uint){
        return property[_propertyId].price;
    }

    // id
    function getPropertyLeasePrice(uint _propertyId) external view override returns (uint){
        return lease[_propertyId].leasePrice;
    }
    // returns the lease price for a particular property


    // contract-caller pays x eth to contract / address(this), where x = getSystemPrice()
    // contract-caller pays x commision to the contract owner, where x = getCommision()
    // property nft is bought for address supplied
    // update maps, variables
    function buy(address  _to) external payable override{
        payable(address(this)).transfer(systemPrice);
        payable(address(this)).transfer(commision);
        uint _price = systemPrice - commision;
        property[currentPropertId] = PropertyNFT(_to, _to, _price, false);
        currentPropertId++;
    }

    // id, lessee, timestamp, price
    function giveLease(uint _id, address _to, uint _timeStamp, uint _leasePrice) external override{
        require(_timeStamp > block.timestamp, "Timestamp provided is not of future time stamp");
        require(_leasePrice > 0, "Lease Price should be greater than 0");
        property[_id].owner = address(this); 
        lease[_id] = Lease(_to, block.timestamp, _timeStamp, _leasePrice, false, false);
        property[_id].onLease = true;
    }

    // ensure timestamp is a future time
    // ensure price is > 0
    // nft owner transfers property nft to the contract/escrow/address(this) for the timestamp and price supplied 
    // update maps

    function claimLease(uint _propertyId) external payable override{
        require(lease[_propertyId].cancel == false, "Already canceled lease!");
        require(lease[_propertyId].paid == false, "Already paid lease!");
        payable(address(this)).transfer(lease[_propertyId].leasePrice);
        payable(property[_propertyId].owner).transfer(lease[_propertyId].leasePrice);
        property[_propertyId].owner = lease[_propertyId].to;
        emit Transfer(address(this), property[_propertyId].owner, lease[_propertyId].leasePrice);
    }
    // leasse transfers eth based on the lease price to the contract/escrow/address(this)
    // contract/escrow/address(this) transfers the payment to the owner and the nft to the lessee
    // update maps

    function completeLease(uint _propertyId) external override{
        require(msg.sender == property[_propertyId].originalOwner, "The contract caller is not the original owner!");
        require(block.timestamp >= lease[_propertyId].end, "Lease time has exceeded!");
        require(lease[_propertyId].cancel == false, "Already canceled lease!");
        payable(msg.sender).transfer(lease[_propertyId].leasePrice);
        lease[_propertyId].to = property[_propertyId].owner;
        emit Transfer(msg.sender, msg.sender, lease[_propertyId].leasePrice);
    }
    // check if contract-caller is original owner
    // check if current time >= lease time
    // transfer nft from lease back to owner
    // update maps

    // ID
    function cancelLease(uint256 _propertyId) external override{
        require(lease[_propertyId].paid == false, "Already Paid");
        require(property[_propertyId].owner != msg.sender, "The contract caller is not owner");
        payable(msg.sender).transfer(lease[_propertyId].leasePrice);
        lease[_propertyId].cancel = true;
    }
    // if lease is paid then deny
    // if contract-caller is not owner then deny
    // contract/escrow transfers nft back to contract-caller
    // update maps

    function getLastTokenId() external view override returns (uint){
        return currentPropertId;
    }
    // returns the last property nft id bought/minted

    function getOwner(uint _propertyId) external view override returns (address){
        return property[_propertyId].owner;
    }
    // Owner of a given token identifier

    // id, reciever
    function transfer(uint _propertyId, address _to) external override
    {
        require(property[_propertyId].onLease != true, "The property is currently on lease");
        require(property[_propertyId].owner != msg.sender, "The contract caller is not owner");
        payable(_to).transfer(property[_propertyId].price);
        property[_propertyId].owner = _to;
        emit Transfer(msg.sender, _to, property[_propertyId].price);
    }
    // if property is on lease then deny
    // if contract-caller is not owner deny
    // transfer nft from contract-caller to reciever
    // update maps
}
