'use strict';
const yahooFinance = require('yahoo-finance');
const talib = require('talib');

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
      name: 'ADX',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      high: marketData.high,
      low: marketData.low,
      close: marketData.close,
      optInTimePeriod: 9,
    },
    {
      name: 'SMA',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      inReal: marketData.close,
      optInTimePeriod: 7
    },
    {
      name: 'CDLHAMMER',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      open: marketData.open,
      high: marketData.high,
      low: marketData.low,
      close: marketData.close
    }
  ];
}

/*
function condenseResults (marketData, taData) {
  const begIndexes = taData.map(taObj => taObj.begIndex);
  const minIndex = max(begIndexes);
  for (let taObj of taData) {

  }
}
*/

async function getData () {
  try {
    let data = await getHistoricalData();
    data = adjustHistoricalData(data);
    const formattedData = await formatData(data);
    const presets = createTaPresets(formattedData);
    const resultPromises = presets.map(preset => talibExecute(preset));
    const results = await Promise.all(resultPromises);
    console.log(results[2].result.outInteger);
  } catch (err) {
    console.log(err);
  }
}

getData();
