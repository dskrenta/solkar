'use strict';
import request from 'request';
import yahooFinance from 'yahoo-finance';
import earningsSnapshot from '../lib/earnings-snapshot';

export default async function options (symbol, expiration = null) {
  try {
    const jsonBody = await getOptionChain(symbol, expiration);
    const optionChain = JSON.parse(jsonBody);
    optionChain.quoteSnapshot = await getQuoteInfo(symbol);
    optionChain.quoteSnapshot.binaryEventExpectedMove = calculateExpectedMove(optionChain);
    optionChain.earningsSnapshot = await earningsSnapshot(symbol);
    return optionChain;
  } catch (err) {
    console.log(err);
  }
}

function getOptionChain (symbol, expiration) {
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

function calculateExpectedMove (optionChain) {
  const strikes = optionChain.optionChain.result[0].strikes;
  const marketPrice = optionChain.optionChain.result[0].quote.regularMarketPrice;
  const atmStrike = strikes.reduce((prev, curr) => (Math.abs(curr - marketPrice) < Math.abs(prev - marketPrice)) ? curr : prev);
  const puts = optionChain.optionChain.result[0].options[0].puts;
  const calls = optionChain.optionChain.result[0].options[0].calls;
  const atmPutIndex = puts.findIndex(elem => elem.strike === atmStrike);
  const atmCallIndex = calls.findIndex(elem => elem.strike === atmStrike);
  return (puts[atmPutIndex].lastPrice + calls[atmCallIndex].lastPrice) * 0.85;
}
