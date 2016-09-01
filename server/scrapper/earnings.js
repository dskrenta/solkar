'use strict';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';
import loadDOM from './scrape';

export default async function earnings (url) {
  try {
    const $ = await loadDOM('https://biz.yahoo.com/research/earncal/today.html');
    const data = await parseEarnings($);
    const modData = data.map(elem => getQuoteInfo(elem.symbol));
    const quoteData = await Promise.all(modData);
    for (let i = 0; i < data.length; i++) {
      data[i]['quoteData'] = quoteData[i];
    }
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getQuoteInfo (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  })
}

function parseEarnings ($) {
  return new Promise((resolve, reject) => {
    const backLength = $('tr').get().length - 2;
    const data = $('tr')
      .map((i, el) => {
        if (i > 8 && i < backLength) {
          const children = $(el).children()
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
      .get()
    resolve(data);
  });
}
