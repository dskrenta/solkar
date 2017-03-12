<sidebar>
  <div>
    <p each={presets} onclick={symbolSelect}>{symbol}</p>
  </div>
  <script>
    const self = this;
    this.presets = [
      {symbol: 'NFLX'},
      {symbol: 'AMZN'},
      {symbol: 'M'},
      {symbol: 'MCD'},
      {symbol: 'XLE'},
      {symbol: 'XLF'},
      {symbol: 'SNAP'},
      {symbol: 'AAPL'},
      {symbol: 'RUT'},
      {symbol: 'GOOG'},
      {symbol: 'GOOGL'},
      {symbol: 'SDRL'},
      {symbol: 'QQQ'},
      {symbol: 'SQQQ'},
      {symbol: 'ORCL'},
      {symbol: 'FB'},
      {symbol: 'PSDO'},
      {symbol: 'OIH'},
      {symbol: 'XRT'},
      {symbol: 'CAT'},
      {symbol: 'SPY'},
      {symbol: 'SBUX'},
      {symbol: 'UAA'},
      {symbol: 'KATE'},
      {symbol: 'PCLN'},
      {symbol: 'THC'},
    ];

    symbolSelect (event) {
      console.log(event.item.symbol);
      observe.trigger('quoteUpdate', event.item.symbol);
    }
  </script>
</sidebar>
