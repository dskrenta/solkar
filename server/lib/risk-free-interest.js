'use strict';
import loadDOM from '../scraper/scrape';

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
    rate = (Math.pow((rate / 100) + 1, 4) - 1) * 100;
    resolve(rate);
  });
}
