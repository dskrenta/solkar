<pred>
  <div>
    <h1>{symbol}</h1>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';

    observe.on('quoteUpdate', (symbol) => {
      self.symbol = symbol;
      self.update();
    });
</pred>
