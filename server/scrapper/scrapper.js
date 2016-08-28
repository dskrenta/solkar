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
    return await parseEarnings($);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

function parseEarnings ($) {
  return new Promise((resolve, reject) => {
    const backLength = $('tr').get().length - 2;
    const data = $('tr')
      .map((i, el) => {
        if (i > 8 && i < backLength) {
          let children = $(el).children()
          return {
            company: $(children[0]).text(),
            symbol: $(children[1]).text(),
            eps: $(children[2]).text(),
            time: $(children[3]).text()
          };
        }
      })
      .get()
    resolve(data);
  });
}
