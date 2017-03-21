import yahooFinance from 'yahoo-finance';

export function historicalQuotes (symbol, startDate, endDate) {
  return yahooFinance.historical({
    symbol: symbol,
    from: startDate,
    to: endDate
  });
}
