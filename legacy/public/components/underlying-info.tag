<underlying-info>

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

  this.on('mount', () => {
    getOptionsChain('GOOG');
  });

  /*
  async function getOptionsChain (symbol) {
    try {
      const requestUrl = `${window.location.origin}/options/${symbol}`;
      const optionsChain = await self.requestPromise(requestUrl);
      console.log(optionsChain);
    } catch (err) {
      console.log(err);
    }
  }
  */

  function getOptionsChain(symbol) {
    self.request(`${window.location.origin}/options/${symbol}`, (result) => {
      console.log(result);
    });
  }

  </script>
</underlying-info>
