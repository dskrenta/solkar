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

export async function getEarnings (url) {
  try {
    const $ = await loadDOM(url);
    return await parseEarnings($);
  } catch (error) {
    console.log(error);
  }
}

function parseEarnings ($) {
  return new Promise((resolve, reject) => {
    let data = $('tr')
      .map((i, el) => `${$(el).html()} \n`)
      .get()
    resolve(data);
  });
}
