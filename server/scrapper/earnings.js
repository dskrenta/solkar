'use strict';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';
import loadDOM from './scrape';

export async function earnings (dateString) {
  try {
    const url = URLFromDate(dateString);
    const $ = await loadDOM(url);
    const data = await parseEarnings($);
    const quoteDataSymbols = data.map(elem => getQuoteInfo(elem.symbol));
    const earningsSupriseSymbols = data.map(elem => getEarningsHistory(elem.symbol));
    const quoteData = await Promise.all(quoteDataSymbols);
    const supriseData = await Promise.all(earningsSupriseSymbols);
    for (let i = 0; i < data.length; i++) {
      data[i]['quoteData'] = quoteData[i];
      data[i]['earningsHistory'] = supriseData[i];
    }
    getAverageSuprise(data);
    return data;
  } catch (err) {
    console.log(`Earnings error: ${err}`);
  }
}

export async function getEarningsHistory (symbol) {
  try {
    const $ = await loadDOM(`http:\/\/www.nasdaq.com/symbol/${symbol}/earnings-surprise`);
    const data = await parseEarningsHistory($);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function URLFromDate (dateString) {
  const date = dateString ? dateString : formatDate(new Date());
  return `https:\/\/biz.yahoo.com/research/earncal/${date}.html`;
}

function formatDate (date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (day.length === 1) day = '0' + day;
  if (month.length === 1) month = '0' + month;
  return year + month + day;
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
          if (time === 'Before Market Open' || time === 'After Market Close') {
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
