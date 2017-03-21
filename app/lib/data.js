export async function getData (symbol) {
  try {
    const now = new Date();
    const endDate = new Date(now.setUTCDate(now.getUTCDate() - 1));
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

    let marketData = await lib.quoteSnapshot(symbol);
    observe.trigger('quote-update:marketData', marketData);

    let spotData = await lib.spot(symbol);
    observe.trigger('quote-update:spotData', spotData);

    let optionsData = await lib.options(symbol);
    observe.trigger('quote-update:optionsData', optionsData);

    let historicalData = await lib.historicalQuotes(symbol);
    observe.trigger('quote-update:historicalData', historicalData);

    let earningsData = await lib.earnings(symbol);
    observe.trigger('quote-update:earningsData', earningsData);
  } catch (err) {
    console.log(err);
  }
}
