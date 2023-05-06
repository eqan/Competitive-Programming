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
    function transfer(uint, address, uint) external;
    // if property is on lease then deny
    // if contract-caller is not owner deny
    // transfer nft from contract-caller to reciever
    // update maps
}
