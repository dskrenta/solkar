'use strict';
import yahooFinance from 'yahooFinance';

export default function quoteSnapshot (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  });
}
