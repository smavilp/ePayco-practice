const epayco = require("epayco-sdk-node")({
  apiKey: "471d8f186ea49939edbd46abd191bf79",
  privateKey: "105e0d4a91018c396cc75cc675b83b3c",
  lang: "ES",
  test: true
});

module.exports = epayco;
