export async function getData (symbol) {
  try {
    const now = new Date();
    const endDate = new Date(now.setUTCDate(now.getUTCDate() - 1));
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    const marketData = await lib.quoteSnapshot(symbol);
    const earningsData = await lib.earnings(symbol);
    const optionsData = await lib.options(symbol);
    const historicalData = await lib.historicalQuotes(symbol, startDate, endDate);
    const spotData = await lib.spot(symbol);
    return {
      marketData: marketData,
      earningsData: earningsData,
      optionsData: optionsData,
      historicalData: historicalData,
      spotData: spotData
    };
  } catch (err) {
    console.log(err);
  }
}
