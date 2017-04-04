import talib from 'talib';

export async function TA (marketData) {
  try {
    const formattedData = await formatData(marketData);
    const presets = await lib.createTaPresets(formattedData);
    const resultPromises = presets.map(preset => talibFunc(preset));
    const results = await Promise.all(resultPromises);
    return results;
  } catch (err) {
    console.log('TA function error: ', err);
  }
}

function talibFunc (preset) {
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

function formatData (marketData) {
  return new Promise((resolve, reject) => {
    marketData = lib.adjustHistoricalData(marketData);
    const result = {
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    for (const item of marketData) {
      result.open.push(item.open);
      result.high.push(item.high);
      result.low.push(item.low);
      result.close.push(item.close);
      result.volume.push(item.volume);
    }
    resolve(result);
  });
}

/*
function createPresets (marketData) {
  return new Promise((resolve, reject) => {
    const result = [
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
      }
    ];
    resolve(result);
  });
}
*/
