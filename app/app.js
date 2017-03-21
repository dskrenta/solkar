'use strict';
import { remote } from 'electron';
import * as riot from 'riot';
import * as d3 from 'd3';
import request from 'request';
import cheerio from 'cheerio';
import yahooFinance from 'yahoo-finance';
import * as lib from './lib/lib.js';
import './components/components.js';

const observe = riot.observable();

riot.mount('main');
