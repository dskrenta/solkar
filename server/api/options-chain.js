'use strict';
import request from 'request';
import yahooFinance from 'yahoo-finance';
import earningsSnapshot from '../lib/earnings-snapshot';

export default async function options (symbol, expiration = null) {
  try {
    const jsonBody = await getOptionsChain(symbol, expiration);
    const optionsChain = JSON.parse(jsonBody);
    optionsChain.quoteSnapshot = await getQuoteInfo(symbol);
    optionsChain.earningsSnapshot = await earningsSnapshot(symbol);
    return optionsChain;
  } catch (err) {
    console.log(err);
  }
}

function getOptionsChain (symbol, expiration) {
  return new Promise((resolve, reject) => {
    let url = `https:\/\/query2.finance.yahoo.com/v7/finance/options/${symbol}`;
    if (expiration) url += `?date=${expiration}`;
     request(url, (error, response, body) => {
       if (error) {
         reject(error);
       } else {
         resolve(body);
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
