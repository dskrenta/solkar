'use strict';

/*
  s = underlying price (USD per share)
  x = strike price (USD per share)
  v = volatility (% p.a.)
  r = continuously compounded risk-free interest rate (% p.a.)
  q = continuously compounded dividend yield (% p.a.)
  t = time to expiration (% of year)
*/

export default function blackScholes (type, s, x, v, r, t, q = 0) {
  console.log(`type: ${type}, s: ${s}, x: ${x}, v: ${v}, r: ${r}, t: ${t}, q: ${q}`);
  if (type === 'call') {
    let d1 = funcD1(s, x, v, r, q, t);
    let d2 = funcD2(d1, v, t);
    let nd1 = N(d1);
    let nd2 = N(d2);
    let term1 = s * Math.pow(Math.E, (-q * t)) * nd1;
    let term2 = x * Math.pow(Math.E, (-r * t)) * nd2;
    console.log(`term1: ${term1}, term2: ${term2}`);
    return term1 - term2;
  } else {
    let d1 = funcD1(s, x, v, r, q, t);
    let d2 = funcD2(d1, v, t);
    let nd1 = N(-1 * d1);
    let nd2 = N(-1 * d2);
    let term1 = x * Math.pow(Math.E, (-r * t)) * nd2;
    let term2 = s * Math.pow(Math.E, (-q * t)) * nd1;
    console.log(`term1: ${term1}, term2: ${term2}`);
    return term1 - term2;
  }
}

/*
export default function blackScholes (type, s, x, v, r, q, t) {
  if (type === 'call') {
    let term1 = s * Math.pow(Math.e, (-q * t)) * N(d1(s, x, v, r, q, t));
    let term2 = x * Math.pow(Math.e, (-r * t)) * N(d2(s, x, v, r, q, t));
    return term1 - term2;
  } else if (type === 'put') {
    let term1 = x * Math.pow(Math.e, (-r * t)) * N(-1 * d2(s, x, v, r, q, t));
    let term2 = s * Math.pow(Math.e, (-q * t)) * N(-1 * d1(s, x, v, r, q, t));
    return term1 - term2;
  }
}
*/

/*
export function blackScholesCall (s, x, v, r, q, t) {
  let term1 = s * Math.pow(Math.e, (-q * t)) * N(d1(s, x, v, r, q, t));
  let term2 = x * Math.pow(Math.e, (-r * t)) * N(d2(s, x, v, r, q, t));
  return term1 - term2;
}

export function blackScholesPut (s, x, v, r, q, t) {
  let term1 = x * Math.pow(Math.e, (-r * t)) * N(-1 * d2(s, x, v, r, q, t));
  let term2 = s * Math.pow(Math.e, (-q * t)) * N(-1 * d1(s, x, v, r, q, t));
  return term1 - term2;
}
*/

function funcD1 (s, x, v, r, q, t) {
  let term1 = Math.log(s / x);
  let term2 = t * (r - q + (Math.pow(v, 2) / 2));
  let numerator = term1 + term2;
  let denominator = v * Math.sqrt(t);
  return numerator / denominator;
}

function funcD2 (d1, v, t) {
  return d1 - (v * Math.sqrt(t));
}

function N (input) {
  let exp = (-1/2) * Math.pow(input, 2);
  let numerator = Math.pow(Math.E, exp);
  let denominator = Math.sqrt(2 * Math.PI);
  console.log(`exp: ${exp}, numerator: ${numerator}`);
  return numerator / denominator;
}
