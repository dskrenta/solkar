'use strict';
import request from 'request';
import cheerio from 'cheerio';
import crypto from 'crypto';
import yahooFinance from 'yahoo-finance';
import loadDOM from './scrape';

export async function earnings (dateString) {
  if (dateString) {
    try {
      const url = `https:\/\/biz.yahoo.com/research/earncal/${dateString}.html`;
      const $ = await loadDOM(url);
      const earnings = await parseEarnings($);
      const finalEarnings = [];
      const count = earnings.length;
      const quoteDataSymbols = earnings.map(elem => getQuoteInfo(elem.symbol));
      const earningsResearch = earnings.map(elem => getEarningsResearch(elem.symbol));
      const quoteData = await Promise.all(quoteDataSymbols);
      const researchData = await Promise.all(earningsResearch);
      for (let i = 0; i < count; i++) {
        let data = earnings[i];
        data['quoteData'] = quoteData[i];
        data['earningsResearch'] = researchData[i];
        finalEarnings.push(data);
      }
      return finalEarnings;
    } catch (err) {
      console.log(`Main Earnings error: ${err}`);
    }
  }
}

/*
export async function earnings (dateString) {
  if (dateString) {
    try {
      const url = `https:\/\/biz.yahoo.com/research/earncal/${dateString}.html`;
      const $ = await loadDOM(url);
      const data = await parseEarnings($);
      console.log(`data: ${data}`);
      const quoteDataSymbols = data.map(elem => getQuoteInfo(elem.symbol));
      // const earningsSupriseSymbols = data.map(elem => getEarningsHistory(elem.symbol));
      const earningsResearch = data.map(elem => getEarningsResearch(elem.symbol));
      const quoteData = await Promise.all(quoteDataSymbols);
      // const supriseData = await Promise.all(earningsSupriseSymbols);
      const researchData = await Promise.all(earningsResearch);
      // data['id'] = crypto.createHash('md5').update(dateString).digest('hex');
      for (let i = 0; i < data.length; i++) {
        data[i]['quoteData'] = quoteData[i];
        // data[i]['earningsHistory'] = supriseData[i];
        data[i]['earningsResearch'] = researchData[i];
      }
      // getAverageSuprise(data);
      return data;
    } catch (err) {
      console.log(`Main Earnings error: ${err}`);
    }
  }
}
*/

export async function getEarningsHistory (symbol) {
  try {
    const $ = await loadDOM(`http:\/\/www.nasdaq.com/symbol/${symbol}/earnings-surprise`);
    const data = await parseEarningsHistory($);
    return data;
  } catch (err) {
    console.log(`Earnings History error: ${err}`);
  }
}

export async function getEarningsResearch (symbol) {
  try {
    const $ = await loadDOM(`http:\/\/stocksearning.com/q.aspx?Sys=${symbol}`);
    const data = await parseEarningsResearch($, symbol);
    return data;
  } catch (err) {
    console.log(`Earnings Research error: ${err}`);
  }
}

function URLFromDate (dateString) {
  return `https:\/\/biz.yahoo.com/research/earncal/${dateString}.html`;
}

function getAverageSuprise (arr) {
  for (let i = 0; i < arr.length; i++) {
    let times = 0;
    let sum = 0;
    const earningsHistory = arr[i].earningsHistory;
    for (let j = 0; j < earningsHistory.length; j++) {
      if (earningsHistory[j] && earningsHistory[j].suprise) {
        const suprise = Number(earningsHistory[j].suprise);
        sum += Math.abs(suprise);
        times++;
      }
    }
    if (times !== 0) arr[i].averageEarningsSuprise = sum / times;
  }
}

function getQuoteInfo (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  });
}

function parseEarnings ($) {
  return new Promise((resolve, reject) => {
    const backLength = $('tr').get().length - 2;
    const data = $('tr')
      .map((i, el) => {
        if (i > 8 && i < backLength) {
          const children = $(el).children();
          const time = $(children[3]).text();
          const symbol = $(children[1]).text();
          if (time === 'Before Market Open' || time === 'After Market Close' || time === 'Time Not Supplied') {
            return {
              company: $(children[0]).text(),
              symbol: symbol,
              eps: $(children[2]).text(),
              time: time
            };
          }
        }
      })
      .get();
    resolve(data);
  });
}

function parseEarningsHistory ($) {
  return new Promise((resolve, reject) => {
    const data = $('.genTable')
      .find('table')
      .find('tr')
      .map((i, el) => {
        if (i > 0) {
          const children = $(el).children();
          return {
            fiscalQuarterEnd: $(children[0]).text(),
            dateReported: $(children[1]).text(),
            eps: $(children[2]).text(),
            consensusEpsForcast: $(children[3]).text(),
            suprise: $(children[4]).text()
          };
        }
      })
      .get();
    resolve(data);
  });
}

function parseEarningsResearch ($, symbol) {
  return new Promise((resolve, reject) => {
    const data = {};
    data.symbol = symbol;
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
