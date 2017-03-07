'use strict';
import request from 'request';
import cheerio from 'cheerio';
import loadDOM from './scrape';

export default async function options (symbol, dateString) {
  if (dateString) {
    // only scrape input date
    try {
      const date = new Date(dateString).getUTCMilliseconds();
      const url = `http:\/\/finance.yahoo.com/quote/${symbol}/options?p=${symbol}&date=${date}`;
      const $ = await loadDOM(url);
      const options = await parseOptions($);
      return options;
    } catch (err) {
      console.log(err);
    }
  } else {
    // scrape default date and get other expiration dates
    try {
      const url = `http:\/\/finance.yahoo.com/quote/${symbol}/options?p=${symbol}`;
      const $ = await loadDOM(url);
      // const options = await parseOptions($);
      const expDates = await parseExpDates($);
      // return {optionChain: options, expDates: expDates};
    } catch (err) {
      console.log(err);
    }
  }
}

function parseOptions ($) {
  return new Promise((resolve, reject) => {

  });
}

function parseExpDates ($) {
  return new Promise((resolve, reject) => {
    console.log($('option').html());
    /*
      .children()
      .map((i, el) => {
        console.log(el);
      })
      .get();
      */
    resolve('*');
  });
}
