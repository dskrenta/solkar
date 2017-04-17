'use strict';
const Backtest = require('./backtest.js');

const bt = new Backtest();

let prevSarHigher = false;

bt.setTradingLogic(bar => {
  if (bar.SAR > bar.high && bar.SAR > bar.low) {
    if (!prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      // short
      if (bt.currentPos) bt.closeLong(bar);
    }
    // sar is above price
  } else {
    if (prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      // long
      bt.openLong(bar);
    }
    // sar is below price
  }
});
