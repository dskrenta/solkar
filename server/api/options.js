'use strict';
import request from 'request';

export default async function options (symbol) {
  try {
    const options = await getOptionChain(symbol);
    return options;
  } catch (err) {
    console.log(err);
  }
}

function getOptionChain (symbol) {
  return new Promise((resolve, reject) => {
    request(`http:\/\/www.google.com/finance/option_chain?q=${symbol}&output=json`, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}
