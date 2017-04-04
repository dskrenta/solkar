export function adjustHistoricalData (data) {
  for (let i = 0; i < data.length; i++) {
    const adjRatio = data[i].adjClose / data[i].close;
    data[i].volume = data[i].volume / adjRatio;
    data[i].open = data[i].open * adjRatio;
    data[i].high = data[i].high * adjRatio;
    data[i].low = data[i].low * adjRatio;
    data[i].close = data[i].close * adjRatio;
  }
  return data;
}
