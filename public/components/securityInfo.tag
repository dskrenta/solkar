<securityInfo>

  <div class="securityPage container980">
    <div class="securityCol1">
      <div class="chart"></div>
      <div class="securityInfo">
        <div class="infoClip" each={ stock.info }>
          <h1><strong>{ (info).title }: </strong>{ (info).title.clip }</h1>
        </div>
      </div>
    </div>
    <div class="securityCol2">
      <div class="strategyList">
        <div class="strategyCard" each={ strategy }>
          <numberCont>
            <number></number>
          </numberCont>
        </div>
      </div>
    </div>
  </div>

  <style>

  </style>

  <script>
  const self = this;

  function getOptionsChain(symbol) {
    self.requestPromise(`${window.location.origin}/options/${symbol}`)
      .then(result => {
        self.optionsChain = JSON.parse(result);
        console.log(self.optionsChain);
      })
      .catch(err => {
        console.log(err);
      });
  }

  riot.mount(getOptionsChain('AAPL'));

  </script>
</securityInfo>
