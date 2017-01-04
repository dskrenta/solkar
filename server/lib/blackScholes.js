'use strict';
import cdf from 'distributions-normal-cdf';

/*
  s = underlying price (USD per share)
  x = strike price (USD per share)
  v = volatility (% p.a.)
  r = continuously compounded risk-free interest rate (% p.a.)
  q = continuously compounded dividend yield (% p.a.)
  t = time to expiration (% of year)
*/

export default function blackScholes (type, s, x, v, r, t, q = 1) {
  let d1 = (Math.log(s / x) + t * (r - q + (Math.pow(v , 2) / 2))) / (v * Math.sqrt(v));
  let d2 =  d1 - (v * Math.sqrt(t));
  if (type === 'call') {
    return s * Math.exp(-(q) * t) * cdf(d1) - x * Math.exp(-(r) * t) * cdf(d2);
  } else {
    return x * Math.exp(-(r) * t) * cdf(-(d2)) - s * Math.exp(-(q) * t) * cdf(-(d1));
  }
}

/*
export default function blackScholes (type, s, x, v, r, t, q = 0) {
  console.log(`type: ${type}, s: ${s}, x: ${x}, v: ${v}, r: ${r}, t: ${t}, q: ${q}`);
  if (type === 'call') {
    let d1 = D1(s, x, v, r, q, t);
    let d2 = D2(d1, v, t);
    let nd1 = cdf(d1);
    let nd2 = cdf(d2);
    console.log(`d1: ${d1}, d2: ${d2}, nd1: ${nd1}, nd2: ${nd2}`);
    let term1 = s * nd1;
    let term2 = x * Math.pow(Math.E, (-r * t)) * nd2;
    console.log(`term1: ${term1}, term2: ${term2}`);
    return term1 - term2;
  } else {
    let d1 = D1(s, x, v, r, q, t);
    let d2 = D2(d1, v, t);
    let nd1 = cdf(-1 * d1);
    let nd2 = cdf(-1 * d2);
    console.log(`d1: ${d1}, d2: ${d2}, nd1: ${nd1}, nd2: ${nd2}`);
    let term1 = x * Math.pow(Math.E, (-r * t)) * nd2;
    let term2 = s * nd1;
    console.log(`term1: ${term1}, term2: ${term2}`);
    return term1 - term2;
  }
}
*/

/*
export default function blackScholes (type, s, x, v, r, t, q = 0) {
  console.log(`type: ${type}, s: ${s}, x: ${x}, v: ${v}, r: ${r}, t: ${t}, q: ${q}`);
  let d1 = D1(s, x, v, r, q, t);
  let d2 = D2(d1, v, t);
  if (type === 'call') {
    return s * Math.exp(-1 * q * t) * cdf(d1) - x * Math.exp(-1 * r * t) * cdf(d2);
  } else {
    return x * Math.exp(-1 * r * t) * cdf(-1 * d2) - s * Math.exp(-1 * q * t) * cdf(-1 * d1);
  }
}
*/

/*
function D1 (s, x, v, r, q, t) {
  return ((Math.log(s / x) + t * (r - q + (Math.pow(v, 2) / 2))) / (v * Math.sqrt(t)));
}
*/

function D1 (s, x, v, r, q, t) {
  let term1 = Math.log(s / x);
  // let term2 = t * (r - q + (Math.pow(v, 2) / 2));
  let term2 = t * (r - (Math.pow(v, 2) / 2));
  let numerator = term1 + term2;
  let denominator = v * Math.sqrt(t);
  return numerator / denominator;
}

function D2 (d1, v, t) {
  return d1 - (v * Math.sqrt(t));
}

/*
function N (x) {
  console.log(`x: ${x}`);
  return ((1 / (2 * Math.PI)) * Math.exp(-1 * (Math.pow(x, 2) / 2)));
}
*/

function N (x) {
  let N = 1 / Math.sqrt(2 * Math.PI);
  N = N * Math.exp((-1 / 2) * Math.pow(x, 2));
  return N;
}
