<options-main>
  <h1>Options Main</h1>

  <script>
    const self = this;

    this.on('mount', () => {
      getOptionChain('AAPL');
    });

    function getOptionChain (symbol) {
      self.request(`http:\/\/www.google.com/finance/option_chain?q=${symbol}&output=json`, (response) => {
        console.log(response);
      });
    }
  </script>
</options-main>
