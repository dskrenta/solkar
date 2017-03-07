<options-chain>
  <div class="container1024">
    <h1>Options Chain</h1>

    <form class="input-form" onsubmit={ handler }>
      <div class="form-group">
        <input type="text" class="form-input" placeholder="symbol"></input>
        <button type="submit" class="btn btn-primary input-group-btn btn-block">Update</button>
      </div>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th>Last Price</th>
          <th>Change</th>
          <th>Volume</th>
          <th>Open Interest</th>
          <th>Strike</th>
          <th>Last Price</th>
          <th>Change</th>
          <th>Volume</th>
          <th>Open Interest</th>
        </tr>
      </thead>
      <tbody>
        <tr each={ straddleData }>
          <td>{ callPrice }</td>
          <td>{ callChange }</td>
          <td>{ callVolume }</td>
          <td>{ callOpenInterest }</td>
          <td>{ strike }</td>
          <td>{ putPrice }</td>
          <td>{ putChange }</td>
          <td>{ putVolume }</td>
          <td>{ putOpenInterest }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    const self = this;

    handler (event) {
      getOptionChain(event.target[0].value);
    }

    function getOptionChain (symbol) {
      self.request(`${window.location.origin}/options/${symbol}`, (response) => {
        let data = JSON.parse(response);
        self.straddleData = straddleFormat(data);
        self.update();
      });
    }

    function straddleFormat (data) {
      const straddleFormatData = [];
      for (let i = 0; i < data.calls.length; i++) {
        straddleFormatData.push({
          strike: data.calls[i].strike,
          callPrice: data.calls[i].price,
          callChange: data.calls[i].change,
          callVolume: data.calls[i].volume,
          callOpenInterest: data.calls[i].openInterest,
          putPrice: data.puts[i].price,
          putChange: data.puts[i].change,
          putVolume: data.puts[i].volume,
          putOpenInterest: data.puts[i].openInterest
        });
      }
      return straddleFormatData;
    }
  </script>
</options-chain>
