<sidebar>
  <div class="title">
    <h3>Presets</h3>
  </div>
  <div each={presets} class="item container column nowrap">
    <div class="container row itemsCenter nowrap" onclick={symbolSelect}>
      <p strong>{symbol}</p>
      <p>{data.lastTradePriceOnly}</p>
      <p>{data.change}</p>
    </div>
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
      observe.trigger('quoteUpdate', event.item.symbol);
    }
  </script>
</sidebar>
