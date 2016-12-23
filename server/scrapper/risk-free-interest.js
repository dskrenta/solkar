'use strict';
import request from 'request';
import cheerio from 'cheerio';
import loadDOM from './scrape';

export default async function riskFreeInterest () {
  const url = 'https://ycharts.com/indicators/3_month_t_bill';
  const $ = await loadDOM(url);
  const rate = await parseRate($);
  return rate;
}

function parseRate ($) {
  return new Promise((resolve, reject) => {
    let rate = $('.listSumry').children().first().text();
    rate = rate.match(/\d+.\d+/)[0];
    rate /= 100;
    rate += 1;
    rate = Math.pow(rate, 4);
    rate -= 1;
    rate *=  100;
    resolve(rate);
  });
}
