'use strict';
import request from 'request';
import cheerio from 'cheerio';

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

export default async function getEarnings (url) {
  try {
    const $ = await loadDOM('https://biz.yahoo.com/research/earncal/today.html');
    const earnings = await parseEarnings($);
    return earnings;
  } catch (error) {
    console.log(error);
  }
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
