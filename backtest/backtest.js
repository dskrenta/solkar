'use strict';
const fs = require('fs');
const talib = require('talib');

class Backtest {
  constructor (
    dataFile = 'spy-2016.json',
    numContracts = 5,
    avgDelta = 0.90,
    taFunctions = [
      'SAR'
    ]
  ) {
    this.dataFile = dataFile;
    this.numContracts = numContracts;
    this.avgDelta = avgDelta * 100;
    this.taFunctions = taFunctions;
    this.main();
  }

  generatePresets () {
    return this.taFunctions.map(taFunction => {
      const def = talib.explain(taFunction);
      const returnObj = {
        name: def.name,
        startIdx: 0,
        endIdx: this.taInputs.close.length - 1,
        open: this.taInputs.open,
        high: this.taInputs.high,
        low: this.taInputs.low,
        close: this.taInputs.close,
      };
      for (let input of def.optInputs) {
        returnObj[input.name] = input.defaultValue;
      }
      return returnObj;
    });
  }

  getMarketData () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.dataFile, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  formatTaInputs () {
    return new Promise((resolve, reject) => {
      const result = {
        open: [],
        high: [],
        low: [],
        close: [],
        volume: []
      };
      for (const item of this.marketData) {
        result.open.push(item.open);
        result.high.push(item.high);
        result.low.push(item.low);
        result.close.push(item.close);
        result.volume.push(item.volume);
      }
      resolve(result);
    });
  }

  talibExecute (preset) {
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

  condenseData () {

  }

  async main () {
    try {
      this.marketData = await this.getMarketData();
      this.taInputs = await this.formatTaInputs();

      const presets = this.generatePresets();
      const resultPromises = presets.map(preset => this.talibExecute(preset));
      this.taData = await Promise.all(resultPromises);

      // const finalResults = condenseResults(marketData, taData);
      // const orderBook = await backtestLoop(finalResults);
      // const computeResults = await compute(orderBook);
      // console.log(`P/L: ${computeResults.toFixed(2)}`);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports= Backtest;
