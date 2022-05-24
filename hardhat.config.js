/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle")

const GOERLI_PRIVATE_KEY =
  "c429801affe4eb38fab1264cd5cefe9fa265ed10a0176f592700c35ad3cb93c9"

const ALCHEMY_API_URL =
  "https://eth-goerli.alchemyapi.io/v2/Uk_qWDAAMVBxOIkCBTT6Zb2Qn8NRobUU"

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `${ALCHEMY_API_URL}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
}
