'use strict';
import cdf from 'distributions-normal-cdf';
import riskFreeInterest from './risk-free-interest';

const T = 252; // Number of business days per year

export default function calculateGreeks (type, stockPrice, strikePrice, impliedVolatility, expiration, q = 0) {
  const t = daysUntilExpiration(expiration) / T;
  if (type === 'call') {

  } else {

  }
}

function D1 (s, x, v, r, q, t) {

}

function D2 () {

}

function daysUntilExpiration (expiration) {
  // Input in EPOCH (UNIX) time
  let currentDate = new Date();
  let expirationDate = new Date(expiration);
}
