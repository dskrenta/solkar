'use strict';
import request from 'request';

export default async function options (symbol) {
  try {
    const options = await getOptionChain(symbol);
    let data = JSON.parse(options);
    data = JSON.stringify(reformatOptionChain(data));
    return data;
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
