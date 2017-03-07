<securityInfo>

  <div class="rContainer">

  </div>

  <style>

  </style>

  <script>
  const self = this;

  function getOptionsChain(symbol) {
    /*self.requestPromise(`${window.location.origin}/options/${symbol}`)
      .then(result => {
        self.optionsChain = JSON.parse(result);
        console.log(self.optionsChain);
      })
      .catch(err => {
        console.log(err);
      });*/
    self.request(`${window.location.origin}/options/${symbol}`, (result) => {
      console.log(result);
      self.optionsChain = JSON.parse(result);
    });
  }

  // riot.mount(getOptionsChain('AAPL'));

  this.on('mount', () => {
    getOptionsChain('GOOG');
  });

  </script>
</securityInfo>
