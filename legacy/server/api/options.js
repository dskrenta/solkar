'use strict';
import request from 'request';
import yahooFinance from 'yahoo-finance';
import blackScholes from '../lib/blackScholes';
import riskFreeInterest from '../lib/risk-free-interest';
import earningsSnapshot from '../lib/earnings-snapshot';

export default async function options (symbol) {
  try {
    const r = await riskFreeInterest();
    let options = await getOptionChain(symbol);
    let data = JSON.parse(options);
    data = reformatOptionChain(data);
    const t = formatExpiration(data.puts[0].expiration);
    data.quoteSnapshot = await getQuoteInfo(symbol);
    data.earningsSnapshot = await earningsSnapshot(symbol);
    const s = data.quoteSnapshot.lastTradePriceOnly;
    let putIvPromise = data.puts.map(put => solveImpliedVolatility('put', s, put.strike, r, t, put.price));
    let callIvPromise = data.calls.map(call => solveImpliedVolatility('call', s, call.strike, r, t, call.price));
    let putIvs = await Promise.all(putIvPromise);
    let callIvs = await Promise.all(callIvPromise);
    for (let i = 0; i < data.puts.length; i ++) {
      data.puts[i].impliedVolatility = putIvs[i];
    }
    for (let i = 0; i < data.calls.length; i ++) {
      data.calls[i].impliedVolatility = callIvs[i];
    }
    return JSON.stringify(data);
  } catch (err) {
    console.log(err);
  }
}

function reformatOptionChain (data) {
  const finalObject = {};
  finalObject.expiration = data.expiry;
  finalObject.expirations = data.expirations;
  finalObject.puts = data.puts.map(put => {
    return {name: put.s, price: put.p, change: put.c, bid: put.b, ask: put.a, volume: put.vol, openInterest: put.oi, strike: parseInt(put.strike), expiration: put.expiry};
  });
  finalObject.calls = data.calls.map(call => {
    return {name: call.s, price: call.p, change: call.c, bid: call.b, ask: call.a, volume: call.vol, openInterest: call.oi, strike: parseInt(call.strike), expiration: call.expiry};
  });
  return finalObject;
}

function validateOptionsJSON (string) {
  string = string.replace(/(\w+:)(\d+\.?\d*)/g, '$1\"$2\"');
  return string.replace(/(\w+):/g, '\"$1\":');
}

function getOptionChain (symbol) {
  return new Promise((resolve, reject) => {
    request(`http:\/\/www.google.com/finance/option_chain?q=${symbol}&output=json`, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(validateOptionsJSON(body));
      }
    });
  });
}

function getQuoteInfo (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  });
}

function formatExpiration (dateString) {
  let currentDate = new Date();
  let expirationDate = new Date(dateString);
  let millisecondDifference = expirationDate.getTime() - currentDate.getTime();
  let hourDifference = millisecondDifference / 1000 / 60 / 60;
  let percentOfYear = hourDifference / 87.6;
  return percentOfYear;
}

function solveImpliedVolatility (type, s, x, r, t, realPrice) {
  return new Promise((resolve, reject) => {
    let min = 0;
    let max = 300;
    let mid = 0;
    while (min <= max) {
      mid = (min + max) / 2;
      let genPrice = blackScholes(type, s, x, mid, r, t);
      console.log(`genPrice: ${genPrice}, realPrice: ${realPrice}`);
      if (genPrice > realPrice) {
        max = mid - 1;
      } else {
        min = mid + 1;
      }
    }
    resolve(mid);
  });
}
