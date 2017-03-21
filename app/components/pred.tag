<pred>
  <div>
    <h1>{symbol}</h1>
    <h1>Data</h1>
  <h1>Built Trades</h1>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';

    observe.on('quote-select', (symbol) => {
      self.symbol = symbol;
      self.update();
    });
</pred>
