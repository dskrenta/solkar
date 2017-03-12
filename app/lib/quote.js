import yahooFinance from 'yahoo-finance';

export function quoteSnapshot (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  });
}
