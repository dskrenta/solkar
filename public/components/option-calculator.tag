<option-calculator>
  <div class="container">
    <h1>Options Calculator</h1>
    <form class="input-form" onsubmit={ handler }>
      <div class="form-group">
        <label class="form-label">Underlying Price (USD per share)</label>
        <input type="text" class="form-input"></input>
        <label class="form-label">Strike Price (USD per share)</label>
        <input type="text" class="form-input"></input>
        <label class="form-label">Implied Volatility (percentage)</label>
        <input type="text" class="form-input"></input>
        <label class="form-label">Continuously Compounded Risk-Free Interest Rate (% p.a.)</label>
        <input type="text" class="form-input"></input>
        <label class="form-label">Continuously Compounded Dividend Yield (% p.a.)</label>
        <input type="text" class="form-input"></input>
        <label class="form-label">Time To Expiration (% of Year)</label>
        <input type="text" class="form-input"></input>
        <button type="submit" class="btn btn-primary input-group-btn btn-block">Submit</button>
      </div>
    </form>
    <h2>Inputs</h2>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Stock Price</th>
          <th>Strike Price</th>
          <th>Implied Volatility</th>
          <th>Risk-Free Interest Rate</th>
          <th>Dividend Yield</th>
          <th>Time to Expiration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ stock }</td>
          <td>{ strike }</td>
          <td>{ volatility }</td>
          <td>{ iR }</td>
          <td>{ dY }</td>
          <td>{ exp }</td>
      </tbody>
    </table>
    <h2>Call Greeks</h2>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Delta</th>
          <th>Gamma</th>
          <th>Theta</th>
          <th>Vega</th>
          <th>Rho</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    <h2>Put Greeks</h2>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Delta</th>
          <th>Gamma</th>
          <th>Theta</th>
          <th>Vega</th>
          <th>Rho</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    const self = this;
    this.stock = 0;
    this.strike = 0;
    this.volatility = 0;
    this.iR = 0;
    this.dY = 0;
    this.exp = 0;

    handler (event) {
      self.stock = event.target[0].value;
      self.strike = event.target[1].value;
      self.volatility = event.target[2].value;
      self.iR = event.target[3].value;
      self.dY = event.target[4].value;
      self.exp = event.target[5].value;

      computeGreeks();

      self.update();
    }

    function computeGreeks () {
      self.d1 = d1();
      self.d2 = d2();
      self.callDelta = callDelta();
      self.callGamma = callGamma();
      self.callTheta = callTheta();
      self.callVega = callVega();
      self.callRho = callRho();
      self.putDelta = putDelta();
      self.putGamma = putGamma();
      self.putTheta = putTheta();
      self.putVega = putVega();
      self.putRho = putRho();
    }

    function N (x) {
      return (Math.pow(Math.e, (-0.5 * Math.pow(x, 2))) / Math.sqrt(2 * Math.PI));
    }

    function d1 () {
      let firstTerm = math.log(self.stock / self.strike);
      let secondTerm = self.exp * (self.iR - self.dY + (Math.pow(self.volatility, 2) / 2));
      let numerator = firstTerm + secondTerm;
      let denominator = self.volatility * Math.sqrt(self.exp);
      return numerator / denominator;
    }

    function d2 () {
      return self.d1 - self.volatility * Math.sqrt(self.exp);
    }

    function SNPD () {
      let first = 1 / Math.sqrt(2 * Math.pi);
      let second = Math.pow(Math.e, ((Math.pow(-self.d1, 2)) / 2));
      return first * second;
    }

    function callDelta () {
      return (Math.pow(Math.e, (-self.dY * self.exp)) * N(self.d1));
    }

    function callGamma () {

    }

    function callTheta () {

    }

    function callVega () {

    }

    function callRho () {

    }

    function putDelta () {
      return (Math.pow(Math.e, (-self.dY * self.exp)) * (N(self.d1) - 1));
    }

    function putGamma () {

    }

    function putTheta () {

    }

    function putVega () {

    }

    function putRho () {

    }

  </script>
</option-calculator>
