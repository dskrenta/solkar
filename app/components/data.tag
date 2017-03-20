<data>
  <div class="container row itemsStart around">
    <h1>{symbol}</h1>
    <h1>{data.name}</h1>
    <h1 class="down">{data.change}</h1>
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
          console.log(self.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  </script>
</data>
