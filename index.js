require("dotenv").config();
const delay = require("delay");
const moment = require("moment");
const binance = require("./binance");

async function printBalance(btcPrice) {
  const balance = await binance.fetchBalance();
  // const balanceTable = [];
  // for (const [key, value] of Object.entries(balance.total)) {
  //   balanceTable.push([key, value]);
  // }
  // console.table(balanceTable);
  const total =  balance.total;
  console.log(`Balance: BTC ${total.BTC}, USDT ${total.USDT}`);
  console.log(`total USDT: ${(total.BTC - 1) * btcPrice + total.USDT} \n`);
}

async function tick() {
  const prices = await binance.fetchOHLCV("BTCUSDT", "1m", undefined, 10);
  const bPrices = prices.map((price) => ({
    timestamp: moment(price[0]).format(),
    open: price[1],
    high: price[2],
    low: price[3],
    close: price[4],
    volume: price[5],
  }));

  const averagePrice = bPrices.reduce((acc, price) => acc + price.close) / 10;
  const lastPrice = bPrices.at(-1).close;
  const direction = lastPrice > averagePrice ? "sell" : "buy";

  const TRADE_SIZE = 100;
  quantity = TRADE_SIZE / lastPrice;
  const order = await binance.createMarketOrder("BTCUSDT", direction, quantity);
  console.log(`${moment().format()}: ${direction} ${quantity} BTC at ${lastPrice}`);
  printBalance(lastPrice);
}

async function main() {
  while (true) {
    await tick();
    await delay(1000 * 60 * 5);
  }
}

// getBalance();
main();
