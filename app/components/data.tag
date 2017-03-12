<data>
  <div>
    <p>{symbol} | {data.lastTradePriceOnly} | {data.volume} | {data.name}</p>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';
    this.data;

    this.on('mount', () => {
      getMarketData();
    });

    observe.on('quoteUpdate', symbol => {
      self.symbol = symbol;
      getMarketData();
    });

    function getMarketData () {
      lib.quoteSnapshot(self.symbol)
        .then(result => {
          self.data = result;
          self.update();
        })
        .catch(err => {
          console.log(err);
        });
    }
  </script>
</data>
