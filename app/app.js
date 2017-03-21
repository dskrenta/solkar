'use strict';
import 'babel-polyfill';
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

observe.on('quote-select', symbol => {
  lib.getData(symbol);
    // .then(result => observe.trigger('quote-update', result))
    // .catch(err => console.log(err));
});

riot.mount('main');
