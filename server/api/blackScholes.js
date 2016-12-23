'use strict';

/*
  s = underlying price (USD per share)
  x = strike price (USD per share)
  v = volatility (% p.a.)
  r = continuously compounded risk-free interest rate (% p.a.)
  q = continuously compounded dividend yield (% p.a.)
  t = time to expiration (% of year)
*/

export function blackScholes (type, s, x, v, r, q, t) {
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

function d1 (s, x, v, r, q, t) {
  let term1 = Math.ln(s / x);
  let term2 = t * (r - q + (Math.pow(v, 2) / 2));
  let numerator = t1 + t2;
  let denominator = v * Math.sqrt(t);
  return numerator / denominator;
}

function d2 (d1, v, t) {
  return d1 - (v * Math.sqrt(t));
}

function N (input) {
  let numerator = Math.pow(Math.e, (-1/2) * Math.pow(input, 2));
  let denominator = Math.sqrt(2 * Math.PI);
  return numberator / denominator;
}
