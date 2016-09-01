'use strict';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';

export default async function earnings (url) {
  try {
    const $ = await loadDOM('https://biz.yahoo.com/research/earncal/today.html');
    const data = await parseEarnings($);
    const modData = data.map(elem => getAverageVolume(elem.symbol));
    const averageDailyVolumes = await Promise.all(modData);
    for (let i = 0; i < data.length; i++) {
      data[i]['averageDailyVolume'] = averageDailyVolumes[i];
    }
    const volumeSortedData = volumeSort(data);
    return volumeSortedData.reverse();
  } catch (err) {
    console.log(err);
  }
}

function loadDOM (url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(cheerio.load(body));
      } else {
        reject(error);
      }
    })
  });
}

function volumeSort (arr) {
  return arr.sort((a, b) => {
    let keyA = a.averageDailyVolume;
    let keyB = b.averageDailyVolume;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}

function getQuoteInfo (symbol, fields) {
  return yahooFinance.snapshot({
    symbol: symbol,
    fields: fields
  })
}

function getAverageVolume (symbol) {
  return new Promise((resolve, reject) => {
    getQuoteInfo(symbol, ['a2']).then(result => resolve(result.averageDailyVolume));
  });
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
