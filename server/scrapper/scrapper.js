'use strict';
import request from 'request';
import cheerio from 'cheerio';

export function loadDOM (url) {
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

export function parse ($) {
  return new Promise((resolve, reject) => {
    let logo = $('h4')
      .map((i, el) => `${$(el).text()} \n`)
      .get()
      .join('');
    resolve(logo);
  });
}
