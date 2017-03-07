'use strict';
import loadDOM from '../scraper/scrape';

export default async function earnigsSnapshot (symbol) {
  try {
    const $ = await loadDOM(`http:\/\/stocksearning.com/q.aspx?Sys=${symbol}`);
    const data = await parseEarningsResearch($, symbol);
    return data;
  } catch (err) {
    console.log(`Earnings snapshot error: ${err}`);
  }
}

function parseEarningsResearch ($, symbol) {
  return new Promise((resolve, reject) => {
    const data = {};
    data.symbol = symbol;
    data.date = $('#ContentPlaceHolder1_lblEarningDate').text();
    data.snippet = $('#ContentPlaceHolder1_lbltotaltime').text();
    data.predictedMove = $('#ContentPlaceHolder1_lblpredictedmove').text();
    data.stockExchange = $('#ContentPlaceHolder1_lblStockExchange').text();
    data.averageVolumes = $('#ContentPlaceHolder1_lblDailyNextvol').text();
    data.shortRatio = $('#ContentPlaceHolder1_lblShortRation').text();
    data['7thDayPredictedMove'] = $('#ContentPlaceHolder1_lblPriceChageSevenDays').text();
    data.sinceLastEarnings = $('#ContentPlaceHolder1_lbllastearning2').text();
    data.priceAtLastEarnings = $('#ContentPlaceHolder1_lbllastprice2').text();
    data.previousClosingPrice = $('#ContentPlaceHolder1_lblclosingprice2').text();
    data.marketCap = $('#ContentPlaceHolder1_lblMarketCap').text();
    data.PERatio = $('#ContentPlaceHolder1_lblPERatio').text();
    data['52WeekRange'] = $('#ContentPlaceHolder1_lbl52WRange').text();
    data.estimatedEPS = $('#ContentPlaceHolder1_lblEstimatedEPS').text();

    data.historicalPriceChanges = $('.datablurbox')
      .eq(0)
      .find('ul')
      .find('li')
      .map((i, el) => {
        const children = $(el).children();
        return {
          earningsDate: $(children[0]).text().trim(),
          closingPriceBeforeEarnings: $(children[1]).text().trim(),
          nextDayClosingPrice: $(children[2]).text().trim(),
          nextDayPriceChange: $(children[3]).text().trim(),
          nextDayVolume: $(children[4]).text().trim(),
          on7thDayClosingPrice: $(children[5]).text().trim(),
          on7thDayPriceChange: $(children[6]).text().trim()
        }
      })
      .get();

      data.historicalVolatility = $('.datablurbox')
        .eq(1)
        .find('ul')
        .find('li')
        .map((i, el) => {
          const children = $(el).children();
          return {
            earningsDate: $(children[0]).text().trim(),
            openPrice: $(children[1]).text().trim(),
            lowPrice: $(children[2]).text().trim(),
            highPrice: $(children[3]).text().trim(),
            closingPrice: $(children[4]).text().trim(),
            volatility: $(children[5]).text().trim(),
            closingPriceChange: $(children[6]).text().trim()
          }
        })
        .get();

    resolve(data);
  });
}
