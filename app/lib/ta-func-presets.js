export async function createTaPresets (marketData) {
  return [
    {
      name: 'ADX',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      high: marketData.high,
      low: marketData.low,
      close: marketData.close,
      optInTimePeriod: 9,
    },
    {
      name: 'SMA',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      inReal: marketData.close,
      optInTimePeriod: 7
    },
    {
      name: 'CDLHAMMER',
      startIdx: 0,
      endIdx: marketData.close.length - 1,
      open: marketData.open,
      high: marketData.high,
      low: marketData.low,
      close: marketData.close
    }
  ];
}
