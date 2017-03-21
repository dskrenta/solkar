<chart>
  <div>
    <h1>{symbol} Chart</h1>
    <svg version="1.1"
     baseProfile="full"
     width="100%" height="100vh"
     xmlns="http://www.w3.org/2000/svg">
      <rect x=10"" y="100" width="10" height="100" fill="red" />
      <line x1="15" y1="20" x2="15" y2="220" stroke-width="2" stroke="red"/>

      <rect x="40" y="110" width="10" height="50" fill="green" />
      <line x1="45" y1="20" x2="45" y2="220" stroke-width="2" stroke="green"/>

      <rect x="70" y="100" width="10" height="100" fill="green" />
      <line x1="75" y1="20" x2="75" y2="220" stroke-width="2" stroke="green"/>
    </svg>
  </div>

  <script>
    const self = this;
    this.symbol = 'SPY';

    observe.on('quote-select', symbol => {
      self.symbol = symbol;
      self.update();
    });
  </script>
</chart>
