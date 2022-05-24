const { expect } = require("chai")

describe("Token contract", function () {
  it("Deployment should assing the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners()
    const Token = await ethers.getContractFactory("Token") // instance of contract

    const hardhatToken = await Token.deploy() // deployment of contract
    const ownerBalance = await hardhatToken.balanceOfAcc(owner.address) // owner balance specified in contract - returned by balanceOfAcc method of contract
    console.log({ ownerBalance })

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance) // check if total supply (10,000) is equals to the owner balance
  })
  // Transfer Function
  it("Should transfer tokens between account", async function () {
    const [owner, address1, address2] = await ethers.getSigners()
    const Token = await ethers.getContractFactory("Token") // instance of contract

    const hardhatToken = await Token.deploy() // deployment of contract

    //   transfer 10 tokens from owner to address1 - it by default take owner's account for transaction
    await hardhatToken.transfer(address1.address, 10)
    expect(await hardhatToken.balanceOfAcc(address1.address)).to.equal(10)

    // transfer 5 tokens from address1 to address2 - we need to connect both account to initiate transaction
    await hardhatToken.connect(address1).transfer(address2.address, 5)

    expect(await hardhatToken.balanceOfAcc(address2.address)).to.equal(5)
    expect(await hardhatToken.balanceOfAcc(address1.address)).to.equal(5)
  })
})
