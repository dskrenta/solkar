'use strict';
import { remote } from 'electron';
import * as riot from 'riot';
import * as d3 from 'd3';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';
import * as lib from './lib/lib.js';
import './components/components.js';

const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/last');
const observe = riot.observable();

console.log(lib.presets);

observe.on('quote-select', symbol => {
  console.log(symbol);
  // observe.trigger('quote-update');
});

/*
lib.info('AAPL')
  .then(result => console.log(result))
  .catch(err => console.log(err));
*/

riot.mount('main');
