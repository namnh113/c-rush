const chart = require('asciichart');
const fs = require('fs');

function plotAsset() {
  const lines = fs.readFileSync('./trades-log.txt', 'utf8').split('\n');
  const assets = [];

  for (const line of lines) {
    if (line.includes('total USDT')) {
      const asset = line.replace("total USDT:", '').trim();
      assets.push(parseFloat(asset));
    }
  }

  console.clear();
  console.log(chart.plot(assets, {height: 30}));
}

plotAsset();
setInterval(() => {
  plotAsset();
}, 1 * 60 * 100);