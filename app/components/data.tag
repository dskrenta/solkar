<data>
  <div class="container row itemsStart around">
    <h1>{symbol}</h1>
    <h1>{data.name}</h1>
    <h1 class="down">{data.change}</h1>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';
    this.data;

    this.on('mount', () => {
      getMarketData();
    });

    observe.on('quote-select', symbol => {
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
