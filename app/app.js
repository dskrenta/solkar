'use strict';
import { remote } from 'electron';
import * as riot from 'riot';
import * as lib from './lib/lib.js';
import './components/components.js';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';

const observable = riot.observable();

riot.mount('main');
