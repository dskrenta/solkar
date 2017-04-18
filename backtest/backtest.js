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
    this.orderBook = [];
    this.currentPosition = null;
    this.totalPL = 0;
  }

  get currentPos () {
    return this.currentPosition;
  }

  setTradingLogic (tradingLogic) {
    this.tradingLogic = tradingLogic;
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
        inReal: this.taInputs.close
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
      for (let item of this.marketData) {
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

  marketDataStartIndex () {
    const begIndexes = this.taData.map(taObj => taObj.begIndex);
    return Math.max(begIndexes);
  }

  condenseData () {
    const startIndex = this.marketDataStartIndex();
    const taResults = this.taData.map(item => item.result.outReal);
    const modMarketData = this.marketData.slice(startIndex);
    const results = [];
    for (let i = 0; i < modMarketData.length; i++) {
      let resultObj = modMarketData[i];
      for (let j = 0; j < this.taFunctions.length; j++) {
        resultObj[this.taFunctions[j]] = taResults[j][i];
      }
      results.push(resultObj);
    }
    return results;
  }

  openLong (bar) {
    this.orderBook.push({type: 'Open Long', marketData: bar, price: bar.open});
    this.currentPosition = {type: 'long', price: bar.open, shares: this.avgDelta * this.numContracts};
  }

  closeLong (bar) {
    this.orderBook.push({type: 'Close Long', marketData: bar, price: bar.open});
    this.totalPL += (bar.open - this.currentPosition.price) * this.currentPosition.shares;
    this.currentPosition = null;
  }

  openShort (bar) {
    this.orderBook.push({type: 'Open Short', marketData: bar, price: bar.open});
    this.currentPosition = {type: 'short', price: bar.open, shares: -1 * this.avgDelta * this.numContracts};
  }

  closeShort (bar) {
    this.orderBook.push({type: 'Close Short', marketData: bar, price: bar.open});
    this.totalPL += (bar.open - this.currentPosition.price) * this.currentPosition.shares;
    this.currentPosition = null;
  }

  longStop (price) {
    this.orderBook.push({type: 'Long Stop', price: price});
    this.currentStop = {type: 'Long Stop', price: price};
  }

  shortStop (price) {
    this.orderBook.push({type: 'Short Stop', price: price});
    this.currentStop = {type: 'Short Stop', price: price};
  }

  stopCheck (bar) {
    if (this.currentStop) {
      if (this.currentStop.type === 'Long Stop') {
        // check if price is below stop
        if (bar.low <= this.currentStop.price) {
          // execute sell
          this.closeLong(bar);
        }
      } else {
        // check if price is above stop
        if (bar.high >= this.currentStop.price) {
          // execute short cover
          this.closeShort(bar);
        }
      }
    }
  }

  backtestLoop () {
    for (let bar of this.finalMarketData) {
      this.stopCheck(bar);
      this.tradingLogic(bar);
    }
  }

  async main () {
    try {
      this.marketData = await this.getMarketData();
      this.taInputs = await this.formatTaInputs();

      const presets = this.generatePresets();
      const resultPromises = presets.map(preset => this.talibExecute(preset));
      this.taData = await Promise.all(resultPromises);

      this.finalMarketData = this.condenseData();
      this.backtestLoop();

      console.log(this.orderBook);
      console.log(`P/L: ${this.totalPL.toFixed(2)}`);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Backtest;
