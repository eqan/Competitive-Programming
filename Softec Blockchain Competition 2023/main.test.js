const {assert} = require('chai')
const {ethers} = require('hardhat')




const ERR_NOT_CONTRACT_OWNER = 'Only contract owner can perform this action';
const ERR_INVALID_RANGE = 'Invalid range';
const ERR_INVALID_AMOUNT = 'Invalid amount';
const ERR_PAST_UNLOCK_TIME = 'Unlock time has already passed';
const ERR_TRANSFER = 'Transfer failed';
const ERR_LEASE_PAID = 'Lease payment already received';
const ERR_UNAUTHAURIZED = 'Caller unauthorized';
const ERR_EXPIRED = 'Lease has already expired';
const ERR_FUTURE_UNLOCK_TIME = 'Unlock time is in the future';
const ERR_ALREADY_LEASED = 'Property is already leased';
const ERR_INVALID_TOKEN_ID = 'Token Id is invalid';






// describe("testSetCommission()", () => {
//       let test
//       let acc0
//       beforeEach(async () => {
//     const Property = await ethers.getContractFactory('Property')
//         test = await Property.deploy()
//         await test.deployed()
//     acc0 = await web3.eth.getAccounts()[0];
//   });
  
//     it("should set commission to 4 and return true", async () => {
     


//       try {
//         await test.setCommision(6);
//       } catch (error) {
//         // catch Error
//       }


//       try {
//         await test.setCommision(0);
//       } catch (error) {
//         // catch Error
//       }


//       await test.setCommision(4);
//       const commission = await test.getCommision();
//       assert.strictEqual(commission, 4, "Commission is not correctly set");


//       await test.setCommision(2);
//       const newCommission = await test.getCommision();
//       assert.strictEqual(newCommission, 2, "Commission is not correctly set");
//     });


//     it("should return true if the commission is set to 3", async () => {
//       await test.setCommision(3);
//       const commission = await test.getCommision();
//       assert.strictEqual(commission, 3, "Commission is not correctly set");
//     });
//   });


//   describe("testSetSystemPrice()", () => {
//       let test
//       let acc0
//       beforeEach(async () => {
//    const Property = await ethers.getContractFactory('Property')
//         test = await Property.deploy()
//         await test.deployed()
//     acc0 = await web3.eth.getAccounts()[0];
//   });
//     it("should set system price to 100 and return true", async () => {
//       try {
//         await test.setSystemPrice(1100);
//       } catch (error) {
//         // catch Error
//       }


//       try {
//         await test.setSystemPrice(0);
//       } catch (error) {
//         // catch Error
//       }


//       await test.setSystemPrice(100);
//       const systemPrice = await test.getSystemPrice();
//       assert.strictEqual(systemPrice, 100, "System Price is not correctly set");
//     });


//     it("should return true if the system price is set to 105", async () => {
//       await test.setSystemPrice(105);
//       const systemPrice = await test.getSystemPrice();
//       assert.strictEqual(systemPrice, 105, "System Price is not correctly set");
//     });
//   });




// describe('buy', () => {
//     let property
//     let owner
//     let buyer
//     let caller
//     let callerS
//     let ownerS
//     let buyerS
//     const systemPrice = 100
//     const commision = 2
//     beforeEach(async () => {
//         // Deploy the contract and get two accounts to use as owner and buyer
//         const Property = await ethers.getContractFactory('Property')
//         property = await Property.deploy()
//         await property.deployed()
//         ;[caller, owner, buyer] = await web3.eth.getAccounts()
//         ;[callerS, ownerS, buyerS] = await ethers.getSigners()




//         // Set the system price and commision
//         await property.setSystemPrice(systemPrice)
//         await property.setCommision(commision)
//     })




//     it('should transfer the property to the buyer and pay the owner and commision', async () => {
//         const ownerBalance = await web3.eth.getBalance(caller)
//         const initialContractBalance = await web3.eth.getBalance(
//             property.address
//         )
//         try {
//             await property
//                 .connect(buyerS)
//                 .buy(buyer, {value: systemPrice, from: buyer})
//         } catch (err) {
//             console.log(err)
//         }
//         const tokenId = await property.getLastTokenId()
//         // Check that the buyer is now the owner of the property
//         assert.equal(await property.getOwner(tokenId), buyer)




//         // Check that the owner and commision were paid
//         const price=systemPrice-commision;
//         const expectedOwnerBalance = web3.utils
//             .toBN(ownerBalance)
//             .add(web3.utils.toBN(commision))
//         const ownerBalance1 = await web3.eth.getBalance(caller)
//         assert.equal(ownerBalance1, expectedOwnerBalance)
//         const expectedContractBalance = web3.utils
//             .toBN(initialContractBalance)
//             .add(web3.utils.toBN(price))
//         const contractBalance1 = await web3.eth.getBalance(property.address)
//         assert.equal(expectedContractBalance, contractBalance1)
//     })




//     it('should revert if the buyer does not send enough ether', async () => {
//         try {
//             await property.buy(buyer, {value: systemPrice - 50})
//             assert.fail('Transaction should have reverted')
//         } catch (error) {
//             console.log(error.message)
//             assert(
//                 error.message.includes(ERR_INVALID_AMOUNT),
//                 `Expected "revert", got ${error}`
//             )
//         }
//     })
// })
// describe('giveLease', () => {
//     let contract
//     let owner
//     let lessee
//     let timestamp = Math.floor(Date.now() / 1000) + 3600 // Set timestamp to 1 hour from now
//     let leasePrice = 5
//     const systemPrice = 100
//     const commision = 2
//     let ownerS
//     let lesseeS




//     beforeEach(async () => {
//         ;[owner, lessee] = await web3.eth.getAccounts()
//         ;[ ownerS, lesseeS] = await ethers.getSigners()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contract = await Property.connect(deployer).deploy()
//         await contract.deployed()
//         leasePrice = 5
//         timestamp = Math.floor(Date.now() / 1000) + 3600
//         // Set the system price and commision
//         await contract.setSystemPrice(systemPrice)
//         await contract.setCommision(commision)
//     })




//     it('should transfer the token to the contract and add it to the lease list', async () => {
//         const initialOwner = owner
//         const tokenId = 1
//         await contract.buy(initialOwner, {value: systemPrice})




//         // Give the lease to the contract
//         await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
//             from: initialOwner,
//         })
//         const lease = await contract.lease(tokenId)
//         assert.equal(lease[0], lessee, 'Lessee address is incorrect')
   




//         // Verify that the token is owned by escrow
//         const newOwner = await contract.ownerOf(tokenId)
//         assert.equal(
//             newOwner,
//             contract.address,
//             'Token owner should be escrow'
//         )
//     })




//     it('should revert if price is not greater than zero', async () => {
//         const tokenId = 1
//         const initialOwner = owner




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )
//         leasePrice = 0




//         // Try to give the lease to the contract from a different account
//         try {
//             await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
//                 from: initialOwner,
//             })
//             assert.fail('Giving lease should not be allowed on some price')
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_INVALID_AMOUNT,
//                 'Expected err not found'
//             )
//         }
//     })
//     it('should revert if price is unlock time is passed', async () => {
//         const tokenId = 1
//         const initialOwner = owner




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )




//         timestamp = Math.floor(Date.now() / 1000) - 3600
//         // Try to give the lease to the contract from a different account
//         try {
//             await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
//                 from: initialOwner,
//             })
//             assert.fail(
//                 'Giving lease should not be allowed on past unlock time'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_PAST_UNLOCK_TIME,
//                 'Expected err not found'
//             )
//         }
//     })
//     it('should revert if property is already leased', async () => {
//         const tokenId = 1
//         const initialOwner = owner




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )
//         leasePrice = 5
//         await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
//             from: initialOwner,
//         })
//         let lease = await contract.lease(tokenId)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should be on lease'
//         )
//         // Try to give the lease to the contract from a different account
//         try {
//             await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
//                 from: initialOwner,
//             })
//             assert.fail(
//                 'Giving lease should not be allowed when already leased'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_ALREADY_LEASED,
//                 'Expected err not found'
//             )
//         }
//     })
//     it('should revert if called by someone other than the owner', async () => {
//         const tokenId = 1
//         const initialOwner = owner




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )




//         // Try to give the lease to the contract from a different account
//         try {
//             await contract
//                 .connect(lesseeS)
//                 .giveLease(tokenId, lessee, timestamp, leasePrice)
//             assert.fail(
//                 'Giving lease should not be allowed when called by someone other than the owner'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_UNAUTHAURIZED,
//                 'expected error not found'
//             )
//         }
//     })
// })
// describe('claimLease', () => {
//     let contract
//     const leasePrice = 5
//     const tokenId = 1
//     let owner
//     let buyer
//     let lessee
//     let systemPrice = 100
//     let commision = 2
//     let ownerS
//     let lesseeS
//     let buyerS




//     beforeEach(async () => {
//         ;[owner,buyer, lessee] = await web3.eth.getAccounts()
//         ;[ownerS,buyerS, lesseeS] = await ethers.getSigners()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contract = await Property.connect(deployer).deploy()
//         await contract.deployed()
   
//         // Set the system price and commision
//         await contract.setSystemPrice(systemPrice)
//         await contract.setCommision(commision)
//         await contract.buy(buyer, {value: systemPrice})
//         await contract.connect(buyerS).giveLease(
//             tokenId,
//             lessee,
//             Math.floor(Date.now() / 1000) + 10,
//             leasePrice
//         )
//     })




//     it('should transfer the lease price to the owner and transfer the token to the lessee', async () => {
//         // Get the initial state of the owner's balance and the contract's balance
//         const initialOwnerBalance = await web3.eth.getBalance(buyer)
//         const initialLesseeBalance = await web3.eth.getBalance(lessee)




//         // The lessee should be able to claim the lease by paying the lease price
//         await contract
//             .connect(lesseeS)
//             .claimLease(tokenId, {value: leasePrice})




//         // Get the final state of the owner's balance and the contract's balance
//         const finalOwnerBalance = await web3.eth.getBalance(buyer)
//         const finalLesseBalance = await web3.eth.getBalance(lessee)




//         // Check that the owner's balance has increased by the lease price and the contract's balance has decreased by the lease price
//         assert.equal(
//             finalOwnerBalance,
//             web3.utils
//             .toBN(initialOwnerBalance)
//             .add(web3.utils.toBN(leasePrice)),
//             "Owner's balance should increase by the lease price"
//         )
           
//         // Check that the lessee is now the owner of the token
//         const newOwner = await contract.ownerOf(tokenId)
//         assert.equal(
//             newOwner,
//             lessee,
//             'Lessee should be the new owner of the token'
//         )
//     })




//     it('should revert if called by someone other than the lessee', async () => {
//         // Someone other than the lessee should not be able to claim the lease
//         try {
//             await contract
//                 .connect(ownerS)
//                 .claimLease(tokenId, {value: leasePrice})
//             assert.fail(
//                 'Claiming lease should not be allowed when called by someone other than the lessee'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_UNAUTHAURIZED,
//                 'Error message should contain revert'
//             )
//         }
//     })




//     it('should revert if the amount sent is insufficient', async () => {
//         // The lessee should pay the lease price to claim the lease
//         try {
//             await contract.connect(lesseeS).claimLease(tokenId,{
//                 value: leasePrice - 1,
//             })
//             assert.fail(
//                 'Claiming lease should not be allowed when the lease price is not paid'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_INVALID_AMOUNT,
//                 'Error message should contain revert'
//             )
//         }
//     })




//     it('should revert if already claimed', async () => {
//         await contract.connect(lesseeS).claimLease(tokenId, {
           
//             value: leasePrice,
//         })
//         // The lessee should pay the lease price to claim the lease
//         try {
//             await contract.connect(lesseeS).claimLease(tokenId, {
   
//                 value: leasePrice,
//             })
//             assert.fail(
//                 'Claiming lease should not be allowed when the lease is  paid'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_LEASE_PAID,
//                 'Error message should contain revert'
//             )
//         }
//     })




//     // it('should revert if lease expired', async () => {
//     //     await time.increaseTo(timestamp + 101)
//     //     // The lessee should pay the lease price to claim the lease
//     //     try {
//     //         await contract.connect(lesseeS).claimLease(tokenId, {
   
//     //             value: leasePrice,
//     //         })
//     //         assert.fail(
//     //             'Claiming lease should not be allowed when the lease is expired'
//     //         )
//     //     } catch (error) {
//     //         assert.include(
//     //             error.message,
//     //             ERR_PAST_UNLOCK_TIME,
//     //             'Error message should contain revert'
//     //         )
//     //     }
//     // })
//     it('should revert if the token is not on lease', async () => {
//         const tokenId = 2




//         // Mint a new token and give ownership to the owner
//         await contract.buy(buyer, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(isOwner, buyer, 'Token owner should be the owner')




//         // Try to claim lease on the token
//         try {
//             await contract.connect(lesseeS).claimLease(tokenId, {
               
//                 value: leasePrice,
//             })
//             assert.fail(
//                 'Claim lease should not be allowed if token is not on lease'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_INVALID_TOKEN_ID,
//                 'Error message should contain revert'
//             )
//         }
//     })
// })
// describe('completeLease', () => {
//     let contract
//     let owner
//     let leasee
//     let ownerS
//     let leaseeS
//     const tokenId = 1
//     const leasePrice = 5
//     let timestamp
//     const systemPrice = 100
//     const commision = 2
//     beforeEach(async () => {
//         ;[owner, leasee] = await web3.eth.getAccounts()
//         ;[ownerS, leaseeS] = await  ethers.getSigners()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contract = await Property.connect(deployer).deploy()




//         // Set the system price and commision
//         await contract.setSystemPrice(systemPrice)
//         await contract.setCommision(commision)
//         await contract.deployed()
//         // Buy token and lease it
//         await contract.buy(owner, {value: systemPrice})




//         timestamp = Math.floor(Date.now() / 1000)
//     })


// // TEST CASE REMOVED !

//     // it('should transfer the token back to the owner if the lease is completed', async () => {
//     //     await contract.giveLease(
//     //         tokenId,
//     //         leasee,
//     //         Math.floor(Date.now() / 1000) + 100,
//     //         leasePrice,
//     //         {from: owner}
//     //     )
//     //     // Wait until lease period is over
//     //     await time.increaseTo(timestamp + 101)
//     //     const initialOwner = owner
//     //     const initialLeasee = leasee




//     //     // Check that the lease is active
//     //     let lease = await contract.lease(tokenId)
//     //     assert.notEqual(
//     //         lease[0],
//     //         '0x0000000000000000000000000000000000000000',
//     //         'Token should be on lease'
//     //     )




//     //     // Complete the lease
//     //     await contract.completeLease(tokenId, {from: initialOwner})




//     //     // Verify that the token is no longer on lease
//     //     lease = await contract.lease(tokenId)
//     //     assert.equal(
//     //         lease[0],
//     //         '0x0000000000000000000000000000000000000000',
//     //         'Token should not be on lease'
//     //     )




//     //     // Verify that the token is owned by the initial owner
//     //     const newOwner = await contract.getOwner(tokenId)
//     //     assert.equal(
//     //         newOwner,
//     //         initialOwner,
//     //         'Token owner should be the initial owner'
//     //     )
//     // })
//     it('should revert if not onlease', async () => {
//         const initialOwner = owner




//         // Check that the lease is active
//         let lease = await contract.lease(tokenId)
//         assert.equal(
//             lease[0],
//             "0x0000000000000000000000000000000000000000",
//             'Token should not be on lease'
//         )




//         // Try to complete the lease before the lease period is over
//         try {
//             await contract.completeLease(tokenId, {from: initialOwner})
//             assert.fail(
//                 'Completion of lease should not be allowed if not leased'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_INVALID_TOKEN_ID,
//                 'Error message should contain revert'
//             )
//         }




 
//     })




//     it('should revert if the lease is not completed', async () => {
//         const initialOwner = owner
//         await contract.giveLease(
//             tokenId,
//             leasee,
//             Math.floor(Date.now() / 1000) + 100,
//             leasePrice,
//             {from: owner}
//         )




//         // Check that the lease is active
//         let lease = await contract.lease(tokenId)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should be on lease'
//         )




//         // Try to complete the lease before the lease period is over
//         try {
//             await contract.completeLease(tokenId, {from: initialOwner})
//             assert.fail(
//                 'Completion of lease should not be allowed before the lease period is over'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_FUTURE_UNLOCK_TIME,
//                 'Error message should contain revert'
//             )
//         }




//         // Verify that the token is still on lease
//         lease = await contract.lease(tokenId)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should still be on lease'
//         )
//     })




//     it('should revert if called by someone other than the original owner', async () => {
//         const initialLeasee = leasee
//         await contract.giveLease(
//             tokenId,
//             leasee,
//             Math.floor(Date.now() / 1000) + 100,
//             leasePrice,
//             {from: owner}
//         )




//         // Check that the lease is active
//         let lease = await contract.lease(tokenId)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should be on lease'
//         )




//         // Try to complete the lease from a different account
//         try {
//             await contract
//                 .connect(leaseeS)
//                 .completeLease(tokenId)
//             assert.fail(
//                 'Completion of lease should not be allowed by someone other than the original owner'
//             )
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 ERR_UNAUTHAURIZED,
//                 'Error message should contain revert'
//             )
//         }




//         // Verify that the token is still on lease
//         lease = await contract.lease(tokenId)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should still be on lease'
//         )
//     })
// })
// describe('getLastTokenId', () => {
//     let contract
//     let owner
//     let systemPrice = 100
//     let buyer
//     let commision = 2




//     beforeEach(async () => {
//         ;[owner, buyer] = await web3.eth.getAccounts()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contract = await Property.connect(deployer).deploy()
//         await contract.deployed()
//         await contract.setSystemPrice(systemPrice)
//         await contract.setCommision(commision)
//     })




//     it('should return 0 when no tokens have been minted', async () => {
//         const lastTokenId = await contract.getLastTokenId()
//         assert.equal(
//             lastTokenId,
//             0,
//             'getLastTokenId should return 0 when no tokens have been minted'
//         )
//     })




//     it('should return the correct last token id after minting a token', async () => {
//         const tokenId = 1
//         await contract.buy(buyer, {value: systemPrice})
//         const lastTokenId = await contract.getLastTokenId()
//         assert.equal(
//             lastTokenId,
//             tokenId,
//             'getLastTokenId should return the correct last token id after minting a token'
//         )
//     })




//     it('should return the correct last token id after minting multiple tokens', async () => {
//         const tokenId2 = 2
//         await contract.buy(buyer, {value: systemPrice})
//         await contract.buy(buyer, {value: systemPrice})
//         const lastTokenId = await contract.getLastTokenId()
//         assert.equal(
//             lastTokenId,
//             tokenId2,
//             'getLastTokenId should return the correct last token id after minting multiple tokens'
//         )
//     })
// })
// describe('getOwner', () => {
//     let contractInstance
//     let owner
//     let buyer
//     let systemPrice = 100
//     let commision = 2
//     beforeEach(async () => {
//         ;[owner, buyer] = await web3.eth.getAccounts()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contractInstance = await Property.connect(deployer).deploy()
//         await contractInstance.deployed()
//         await contractInstance.setSystemPrice(systemPrice)
//         await contractInstance.setCommision(commision)
//     })




//     it('should return owner address for valid token id', async () => {
//         await contractInstance.buy(buyer, {value: systemPrice})
//         const tokenId = await contractInstance.getLastTokenId()




//         const result = await contractInstance.getOwner(tokenId)




//         assert.equal(result, buyer, 'Owner address is incorrect')
//     })




//     it('should throw an error for invalid token id', async () => {
//         const invalidTokenId = 999




//         try {
//             await contractInstance.getOwner(invalidTokenId)
//             assert.fail('Expected an error but did not receive one')
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 'revert',
//                 'Expected revert but got: ' + error
//             )
//         }
//     })
// })
// describe('transfer', () => {
//     let contract
//     let owner
//     let receiver
//     const systemPrice = 100
//     const commision = 2
//     let ownerS
//     let receiverS
//     beforeEach(async () => {
//         ;[owner, receiver] = await web3.eth.getAccounts()
//         ;[ownerS, receiverS] = await ethers.getSigners()
//         const Property = await ethers.getContractFactory('Property')
//         const deployer = await ethers.getSigner(owner)
//         contract = await Property.connect(deployer).deploy()
//         await contract.setSystemPrice(systemPrice)
//         await contract.setCommision(commision)
//     })




//     it('should transfer the token when called by the owner', async () => {
//         const tokenId = 1
//         const initialOwner = owner
//         const initialReceiver = receiver




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )
//         console.log(initialOwner)




//         try {
//             // Transfer the token to the initialReceiver
//             let x = await contract.transfer(tokenId, initialReceiver, {
//                 from: initialOwner,
//             })
//             console.log(x)
//         } catch (err) {
//             console.log('fg')
//             console.log(err)
//         }
//         const newOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             newOwner,
//             initialReceiver,
//             'Token owner should be the initial receiver'
//         )
//     })




//     it('should not transfer the token if it is on lease', async () => {
//         const tokenId = 1
//         const initialOwner = owner
//         const initialReceiver = receiver




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )




//         // Lease the token
//         const timestamp = Math.floor(Date.now() / 1000)
//         const leasePrice = 5
//         await contract.giveLease(
//             tokenId,
//             initialReceiver,
//             timestamp,
//             leasePrice,
//             {from: initialOwner}
//         )
//         const lease = await contract.lease(tokenId)
//         console.log(lease)
//         assert.notEqual(
//             lease[0],
//             '0x0000000000000000000000000000000000000000',
//             'Token should be on lease'
//         )




//         // Try to transfer the token to the initialReceiver
//         try {
//             x = await contract.transfer(tokenId, initialReceiver, {
//                 from: initialOwner,
//             })
//             console.log(x)
//             assert.fail('Transfer should not be allowed when token is on lease')
//         } catch (error) {
//             assert.include(
//                 error.message,
//                 'revert',
//                 'Error message should contain revert'
//             )
//         }
//     })




//     it('should not transfer the token if it is not called by the owner', async () => {
//         const tokenId = 1
//         const initialOwner = owner
//         const initialReceiver = receiver




//         // Mint a new token and give ownership to the initialOwner
//         await contract.buy(initialOwner, {value: systemPrice})
//         const isOwner = await contract.getOwner(tokenId)
//         assert.equal(
//             isOwner,
//             initialOwner,
//             'Token owner should be the initial owner'
//         )




//         console.log(tokenId)
//         console.log(initialOwner)
//         console.log(initialReceiver)
//         try {
//             await contract
//                 .connect(receiverS)
//                 .transfer(tokenId, initialOwner)
//             assert.fail(
//                 'Transfer should not be allowed when called by someone other than the owner'
//             )
//         } catch (error) {
//             console.log(error.message)
//             assert.include(
//                 error.message,
//                 ERR_UNAUTHAURIZED,
//                 'Error message should contain revert'
//             )
//         }
//     })
//     describe('cancelLease', () => {
// let contract
// let owner
// let systemPrice = 100
// let buyer
// let commision = 2
// let tokenId=1
// let ownerS
// let buyerS




// beforeEach(async () => {
//     ;[owner, buyer] = await web3.eth.getAccounts()
//     ;[ownerS, buyerS] = await ethers.getSigners()
//     const Property = await ethers.getContractFactory('Property')
//     const deployer = await ethers.getSigner(owner)
//     contract = await Property.connect(deployer).deploy()
//     await contract.deployed()
//     await contract.setSystemPrice(systemPrice)
//     await contract.setCommision(commision)
//     await contract.connect(buyerS).buy(buyer, {value: systemPrice})
   
// })




// it('should revert when the token id is invalid', async () => {
//     const invalidTokenId = 2
   
//     try{
//         await contract.connect(buyerS).cancelLease(invalidTokenId)
//         assert.fail('Transaction should have reverted')
//     }catch(error){
//         console.log(error.message)
//             assert.include(
//                 error.message,
//                 ERR_INVALID_TOKEN_ID,
//                 'Error message should contain revert'
//             )
//     }
// })




// it('should revert when the caller is unauthorized', async () => {
//     await contract.connect(buyerS).giveLease(tokenId, owner, Math.floor(Date.now() / 1000) + 3600 , 1)
//     try{
//         await contract.cancelLease(tokenId)
//         assert.fail('Transaction should have reverted')
//     }catch(error){
//         console.log(error.message)
//             assert.include(
//                 error.message,
//                 ERR_UNAUTHAURIZED,
//                 'Error message should contain revert'
//             )
//     }
// })








// it('should revert when the lease payment has already been received', async () => {
//     await contract.connect(buyerS).giveLease(tokenId, owner, Math.floor(Date.now() / 1000) + 3600 , 1)
//     await contract.connect(ownerS).claimLease(tokenId,{value:1})
//     try{
//         await contract.connect(buyerS).cancelLease(tokenId)
//         assert.fail('Transaction should have reverted')
//     }catch(error){
//         console.log(error.message)
//             assert.include(
//                 error.message,
//                 ERR_LEASE_PAID,
//                 'Error message should contain revert'
//             )
//     }
// })
// })
// })


describe('giveLease', () => {
    let contract
    let owner
    let lessee
    let timestamp = Math.floor(Date.now() / 1000) + 3600 // Set timestamp to 1 hour from now
    let leasePrice = 5
    const systemPrice = 100
    const commision = 2
    let ownerS
    let lesseeS




    beforeEach(async () => {
        ;[owner, lessee] = await web3.eth.getAccounts()
        ;[ ownerS, lesseeS] = await ethers.getSigners()
        const Property = await ethers.getContractFactory('Property')
        const deployer = await ethers.getSigner(owner)
        contract = await Property.connect(deployer).deploy()
        await contract.deployed()
        leasePrice = 5
        timestamp = Math.floor(Date.now() / 1000) + 3600
        // Set the system price and commision
        await contract.setSystemPrice(systemPrice)
        await contract.setCommision(commision)
    })




    it('getPropertyLeasePrice returns correct Price', async () => {
        const initialOwner = owner
        const tokenId = 1
        await contract.buy(initialOwner, {value: systemPrice})




        // Give the lease to the contract
        await contract.giveLease(tokenId, lessee, timestamp, leasePrice, {
            from: initialOwner,
        })
        const lease = await contract.lease(tokenId)

        //assert.equal(lease[0], lessee, 'Lessee address is incorrect')
        
        // Verify getPropertyLeasePrice
        let leasePricee = await contract.getPropertyLeasePrice(tokenId)
        assert.equal(Number(lease.price),leasePricee)




        // Verify that the token is owned by escrow
        // const newOwner = await contract.ownerOf(tokenId)
        // assert.equal(
        //     newOwner,
        //     contract.address,
        //     'Token owner should be escrow'
        // )
    })
})