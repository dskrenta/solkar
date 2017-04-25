'use strict';
const Backtest = require('./backtest.js');

/*
dataFile = 'spy-2016.json',
numContracts = 2,
avgDelta = 0.90,
taFunctions = [
  'SAR'
]
*/

const bt = new Backtest('spy-2000-2016.json', 5, 0.90, ['SAR']);

const TICK = 0.10;
let originalPrice = undefined;

bt.setTradingLogic(bar => {
  if (bt.getCurrentLongPosition && originalPrice) {
    if (bar.high > (originalPrice + (2 * TICK))) {
      bt.closeLong(bar);
    }
    bt.longStop(bar.low - TICK);
  } else {
    originalPrice = bar.open;
    bt.openLong(bar);
    bt.longStop(bar.low - TICK);
  }
});
