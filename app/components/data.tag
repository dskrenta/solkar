<data>
  <div>
    <h1>{symbol}</h1>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';

    this.on('mount', () => {
      getMarketData();
      self.update();
    });

    observe.on('quoteUpdate', symbol => {
      self.symbol = symbol;
      getMarketData();
      self.update();
    });

    function getMarketData () {
      lib.quoteSnapshot(self.symbol)
        .then(result => {
          self.data = result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  </script>
</data>
