export async function getData (symbol) {
  try {
    const now = new Date();
    const endDate = new Date(now.setUTCDate(now.getUTCDate() - 1));
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    console.log(startDate, endDate);

    let marketData = await lib.quoteSnapshot(symbol);
    observe.trigger('quote-update:marketData', marketData);

    let optionsData = await lib.options(symbol);
    observe.trigger('quote-update:optionsData', optionsData);

    let historicalData = await lib.historicalQuotes(symbol, startDate, endDate);
    observe.trigger('quote-update:historicalData', historicalData);

    let earningsData = await lib.earnings(symbol);
    observe.trigger('quote-update:earningsData', earningsData);
  } catch (err) {
    console.log(err);
  }
}
