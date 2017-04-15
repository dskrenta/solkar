'use strict';
const yahooFinance = require('yahoo-finance');

const SYMBOL = 'SPY';
const START_DATE = '2016-01-01';
const END_DATE = '2017-01-01';

function getHistoricalData () {
  return yahooFinance.historical({
    symbol: SYMBOL,
    from: START_DATE,
    to: END_DATE
  })
}

function adjustHistoricalData (data) {
  return data.map(item => {
    const adjRatio = item.adjClose / item.close;
    return {
      open: item.open * adjRatio,
      high: item.high * adjRatio,
      low: item.low * adjRatio,
      close: item.close * adjRatio,
      volume: item.volume / adjRatio,
      date: item.date
    };
  });
}

async function getData () {
  try {
    let data = await getHistoricalData();
    return adjustHistoricalData(data);
  } catch (err) {
    console.log(err);
  }
}

function simLoop (data) {
  for (let bar of data) {
    console.log(bar.open, bar.high, bar.low, bar.close, bar.date);
  }
}

async function backtest () {
  try {
    const data = await getData();
    simLoop(data);
  } catch (err) {
    console.log(err);
  }
}

backtest();
