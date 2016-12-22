'use strict';
import request from 'request';
import { blackScholesCall, blackScholesPut } from 'blackScholes';

export default async function options (symbol) {
  try {
    let options = await getOptionChain(symbol);
    let data = JSON.parse(options);
    data = reformatOptionChain(data);
    let json = JSON.stringify(data);
    return json;
  } catch (err) {
    console.log(err);
  }
}

function reformatOptionChain (data) {
  const finalObject = {};
  finalObject.expiration = data.expiry;
  finalObject.expirations = data.expirations;
  finalObject.puts = data.puts.map(put => {
    return {name: put.s, price: put.p, change: put.c, bid: put.b, ask: put.a, volume: put.vol, openInterest: put.oi, strike: put.strike, expiration: put.expiry};
  });
  finalObject.calls = data.calls.map(call => {
    return {name: call.s, price: call.p, change: call.c, bid: call.b, ask: call.a, volume: call.vol, openInterest: call.oi, strike: call.strike, expiration: call.expiry};
  });
  return finalObject;
}

function validateOptionsJSON (text) {
  text = text.replace(/(\w+:)(\d+\.?\d*)/g, '$1\"$2\"');
  return text.replace(/(\w+):/g, '\"$1\":');
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

/*
function solveImpliedVolatility (type, x, realPrice, expiration, dividendYield = 0) {
  return new Promise((resolve, reject) => {
    let min = 0;
    let max = 500;
    let mid = 0;
    while (min <= max) {
      mid = (min + max) / 2;
      let genPrice = 0;
      if (genPrice > realPrice) {
        // if generated call/put price is too high set max to mid
        max = mid - 1;
      } else {
        // if generated call/put price is too low set min to mid
        min = mid + 1;
      }
    }
    resolve(mid);
  });
}
*/
