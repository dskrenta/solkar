# Solkar Backtester

Class for backtesting manual trading strategies

## Install

```npm install```

## API Usage

Initialize new backtesting instance

```const bt = new Backtest();```

Main backtesting logic function

```
bt.setTradingLogic(bar => {
  // trading logic
});
```

## Example PSAR Trading Strategy

```
'use strict';
const Backtest = require('./backtest.js');

const bt = new Backtest();

let prevSarHigher = false;

bt.setTradingLogic(bar => {
  if (bt.getCurrentLongPosition) {
    bt.clearStop();
    bt.longStop(bar.SAR);
  } else if (bt.getCurrentShortPosition) {
    bt.clearStop();
    bt.shortStop(bar.SAR);
  }
  if (bar.SAR > bar.high && bar.SAR > bar.low) {
    if (!prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      if (bt.getCurrentLongPosition) {
        bt.clearStop();
        bt.closeLong(bar);
      }
      bt.openShort(bar);
      bt.shortStop(bar.SAR);
    }
  } else {
    if (prevSarHigher) {
      prevSarHigher = !prevSarHigher;
      if (bt.getCurrentShortPosition) {
        bt.clearStop();
        bt.closeShort(bar);
      }
      bt.openLong(bar);
      bt.longStop(bar.SAR);
    }
  }
});
```
