<earningsv2>
  <div class="container">
    <virtual each={data}>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">{company} <small class="label">{symbol}</small></h4>
          <h6 class="card-meta">Software and hardware</h6>
          <button onclick={toggle}>Expand</button>
        </div>
        <div class="card-body" if={show}>
          <div class="columns">
            <div class="column col-6">General Stock information</div>
            <div class="column col-6">Yahoo graph</div>
          </div>
          <div class="divider"></div>
          <div class="columns">
            <div class="column col-6">
              <h4>Most Active Calls</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th>Exp Date</th>
                    <th>Strike</th>
                    <th>Last</th>
                    <th>Change</th>
                    <th>Change (%)</th>
                    <th>Volume</th>
                    <th>Open Int</th>
                    <th>Bid</th>
                    <th>Ask</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Oct 21, 2016</td>
                    <td>38.00</td>
                    <td>0.57</td>
                    <td>0.25</td>
                    <td>67.65</td>
                    <td>39679</td>
                    <td>42533</td>
                    <td>0.55</td>
                    <td>0.56</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column col-6">
              <h4>Most Active Puts</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th>Exp Date</th>
                    <th>Strike</th>
                    <th>Last</th>
                    <th>Change</th>
                    <th>Change (%)</th>
                    <th>Volume</th>
                    <th>Open Int</th>
                    <th>Bid</th>
                    <th>Ask</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Oct 21, 2016</td>
                    <td>38.00</td>
                    <td>0.57</td>
                    <td>0.25</td>
                    <td>67.65</td>
                    <td>39679</td>
                    <td>42533</td>
                    <td>0.55</td>
                    <td>0.56</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="divider"></div>
          <div class="columns">
            <div class="column col-6">Earnings price change history</div>
            <div class="column col-6">Earnings suprise history</div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">Do</button>
        </div>
      </div>
    </div>
  </virtual>

  <script>
    const self = this;
    this.show = false;
    this.data = [
      {
        company: 'Key Tronic Corp',
        symbol: 'KTCC'
      },
      {
        company: 'Key Tronic Corp',
        symbol: 'KTCC'
      }
    ];

    toggle () {
      self.show = self.show ? false : true;
    }
  </script>
</earningsv2>
