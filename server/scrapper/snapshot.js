'use strict';
import yahooFinance from 'yahoo-finance';

function getQuoteInfo (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  });
}

getQuoteInfo('hawk').then((result) => {
  console.log(JSON.stringify(result, null, '\t'));
});
