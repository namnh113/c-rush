const ccxt = require("ccxt");

const binance = new ccxt.binance({
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET,
});
binance.setSandboxMode(true);
module.exports = binance;