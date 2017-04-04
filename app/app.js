'use strict';
import 'babel-polyfill';
import { remote } from 'electron';
// import * as riot from 'riot';
import * as d3 from 'd3';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';
import * as ta from 'talib';
import * as lib from './lib/lib.js';
import './components/components.js';

const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops');
const observe = riot.observable();
let currentSymbol;

socket.on('message', message => observe.trigger('quote-update:realtime', message));

socket.on('disconnect', () => console.log('Disconnected.'))

observe.on('quote-select', symbol => {
  if (currentSymbol) socket.emit('unsubscribe', currentSymbol);
  currentSymbol = symbol;
  lib.getData(symbol);
  socket.emit('subscribe', symbol);
});

observe.on('quote-update:historicalData', data => {
  lib.TA(data)
    .then(result => observe.trigger('technicalAnalysisUpdate', result))
    .catch(err => console.log(err));
});

riot.mount('*');
