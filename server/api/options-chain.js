'use strict';
import request from 'request';
import yahooFinance from 'yahoo-finance';
import earningsSnapshot from '../scraper/earnings-snapshot';
import greeks from '../lib/greeks';

export default async function options (symbol) {
  try {
    let jsonBody = await getOptionsChain(symbol);
    let optionsChain = JSON.parse(jsonBody);
    optionsChain.quoteSnapshot = await getQuoteInfo(symbol);
    optionsChain.earningsSnapshot = await earningsSnapshot(symbol);
    return optionsChain;
  } catch (err) {
    console.log(err);
  }
}

function getOptionsChain (symbol) {
  return new Promise((resolve, reject) => {
     request(`https:\/\/query1.finance.yahoo.com/v7/finance/options/${symbol}`, (error, response, body) => {
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
