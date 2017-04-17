'use strict';
const talib = require('talib');
const fs = require('fs');

const DATA_FILE = './spy-2016.json';
const NUM_CONTRACTS = 5;
const AVG_DELTA = 0.90 * 100;

function getData () {
  return new Promise((resolve, reject) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function talibExecute (preset) {
  return new Promise((resolve, reject) => {
    talib.execute(preset, (result, err) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function formatData (data) {
  return new Promise((resolve, reject) => {
    const result = {
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    for (const item of data) {
      result.open.push(item.open);
      result.high.push(item.high);
      result.low.push(item.low);
      result.close.push(item.close);
      result.volume.push(item.volume);
    }
    resolve(result);
  });
}

function createTaPresets (marketData) {
  return [
    {
      name: 'SAR',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      high: marketData.high,
      low: marketData.low,
      open: marketData.open,
      close: marketData.close,
      optInAcceleration: 0.02,
      optInMaximum: 0.2
    }
  ];
}

function condenseResults (marketData, taData) {
  const begIndexes = taData.map(taObj => taObj.begIndex);
  const startIndex = Math.max(begIndexes);
  const taResults = taData[0].result.outReal;
  const results = marketData.slice(startIndex);
  const finalResults = [];
  for (let i = 0; i < results.length; i++) {
    let resultObj = results[i];
    resultObj.SAR = taResults[i];
    finalResults.push(resultObj);
  }
  return finalResults;
}

async function backtestLoop (finalResults) {
  return new Promise((resolve, reject) => {
    const orderBook = [];
    let prevSarHigher = false;
    for (let i = 0; i < finalResults.length; i++) {
      const bar = finalResults[i];
      if (bar.SAR > bar.high && bar.SAR > bar.low) {
        if (!prevSarHigher) {
          orderBook.push({type: 1, price: bar.low, index: i});
          prevSarHigher = !prevSarHigher;
        }
      } else {
        if (prevSarHigher) {
          orderBook.push({type: -1, price: bar.high, index: i});
          prevSarHigher = !prevSarHigher;
        }
      }
    }
    resolve(orderBook);
  });
}

function compute (orderBook) {
  return new Promise((resolve, reject) => {
    let totalGain = 0;
    for (let i = 1; i < orderBook.length; i++) {
      const priceDiff = orderBook[i].price - orderBook[i - 1].price;
      const profitLoss = priceDiff * AVG_DELTA * NUM_CONTRACTS;
      totalGain += profitLoss;
    }
    resolve(totalGain);
  });
}

async function backtest () {
  try {
    const marketData = await getData();
    const formattedData = await formatData(marketData);
    const presets = createTaPresets(formattedData);
    const resultPromises = presets.map(preset => talibExecute(preset));
    const taData = await Promise.all(resultPromises);
    const finalResults = condenseResults(marketData, taData);
    const orderBook = await backtestLoop(finalResults);
    const computeResults = await compute(orderBook);
    console.log(`P/L: ${computeResults.toFixed(2)}`);
  } catch (err) {
    console.log(err);
  }
}

backtest();
