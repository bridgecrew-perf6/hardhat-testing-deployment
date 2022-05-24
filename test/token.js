const { expect } = require("chai")
describe("Token Contract", function () {
  let Token
  let hardhatToken
  let owner
  let address1
  let address2
  let restAddress

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token")
    ;[owner, address1, address2, ...restAddress] = await ethers.getSigners()
    hardhatToken = await Token.deploy()
  })
  //
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address)
    })

    it("Should assing the total supply of token to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOfAcc(owner.address)
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
    })
  })

  // Transactions
  describe("Transactions", function () {
    it("Should transfer tokens between account", async function () {
      // transfer 10 tokens to address1
      await hardhatToken.transfer(address1.address, 10)
      expect(await hardhatToken.balanceOfAcc(address1.address)).to.equal(10)
      expect(await hardhatToken.balanceOfAcc(owner.address)).to.equal(
        (await hardhatToken.totalSupply()) - 10
      )

      // transfer 5 token to address2 - first we need to connect both accounts
      await hardhatToken.connect(address1).transfer(address2.address, 5)
      expect(await hardhatToken.balanceOfAcc(address2.address)).to.equal(5)
      expect(await hardhatToken.balanceOfAcc(address1.address)).to.equal(5)
    })
    // check balance if token trying to send is less than balance
    // it("Should fail if sender does not have enough tokens", async function () {
    //   const initialOwnerBalance = await hardhatToken.balanceOfAcc(owner.address)
    //   expect(
    //     await hardhatToken.connect(address1).transfer(owner.address, 1)
    //   ).to.be.revertedWith("Not enough tokens")
    //   expect(await hardhatToken.balanceOfAcc(owner.address)).to.equal(
    //     initialOwnerBalance
    //   )
    // })
    it("Should update balance after transaction", async function () {
      let initialOwnerBalance = await hardhatToken.balanceOfAcc(owner.address)

      await hardhatToken.transfer(address1.address, 10)
      const address1Balance = await hardhatToken.balanceOfAcc(address1.address)
      expect(address1Balance).to.equal(10)
      expect(await hardhatToken.balanceOfAcc(owner.address)).to.equal(
        initialOwnerBalance - address1Balance
      )

      await hardhatToken.transfer(address2.address, 10)
      const address2Balance = await hardhatToken.balanceOfAcc(address2.address)
      expect(address2Balance).to.equal(10)
      expect(await hardhatToken.balanceOfAcc(owner.address)).to.equal(
        initialOwnerBalance - 20
      )
    })
  })
})
