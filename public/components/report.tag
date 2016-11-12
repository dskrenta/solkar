<report>
  <div class="container">
    <h3>{ date }</h3>
    <form class="input-form" onsubmit={ handler }>
      <div class="form-group">
        <label class="form-label">Minimum Average Daily Volume</label>
        <input type="text" class="form-input" value={ filter.minVolume }></input>
        <label class="form-label">Minimum Predicted Move</label>
        <input type="text" class="form-input" value={ filter.minMove }></input>
        <label class="form-checkbox">
            <input type="checkbox" checked />
            <i class="form-icon"></i> Before Market Open
        </label>
        <label class="form-checkbox">
            <input type="checkbox" checked />
            <i class="form-icon"></i> After Market Close
        </label>
        <label class="form-checkbox">
            <input type="checkbox" checked />
            <i class="form-icon"></i> Time Not Supplied
        </label>
        <button type="submit" class="btn btn-primary input-group-btn btn-block">Update</button>
      </div>
    </form>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Company</th>
          <th>EPS Estimate</th>
          <th>Time</th>
          <th>Average Daily Volume</th>
          <th>Predicted Move</th>
          <th>Last Trade</th>
          <th>Short Ratio</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        <tr each={ items }>
          <td><a href={ yahooFinanceURL(symbol) } target="_blank">{ symbol }</a></td>
          <td>{ company }</td>
          <td>{ eps }</td>
          <td><time-icon time={ time } class="tooltip tooltip-left" data-tooltip={ time }/></td>
          <td>{ quoteData.averageDailyVolume ? quoteData.averageDailyVolume : 'N/A' }</td>
          <td>{ earningsResearch.predictedMove }</td>
          <td>{ quoteData.lastTradePriceOnly }</td>
          <td>{ quoteData.shortRatio }</td>
          <td>{ quoteData.marketCapitalization }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    const self = this;
    this.earnings = [];
    this.items = [];
    this.filter = {
      minVolume: 500000,
      minMove: 5,
      bmo: true,
      amc: true,
      tns: true
    };
    this.date = opts.date;

    handler (event) {
      self.filter.minVolume = event.target[0].value;
      self.filter.minMove = event.target[1].value;
      self.filter.bmo = event.target[2].checked;
      self.filter.amc = event.target[3].checked;
      self.filter.tms = event.target[4].checked;
      filter();
    }

    function request (url, callback)  {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseText);
        }
      }
      xhr.open("GET", url, true);
      xhr.send(null);
    }

    yahooFinanceURL (symbol) {
      return `http:\/\/finance.yahoo.com/quote/${symbol}`;
    }

    function filter () {
      self.items = self.earnings;
      self.items = self.items
        .filter(value => value.earningsResearch ? value['earningsResearch']['predictedMove'] : false)
        .filter(value => parseInt(value.earningsResearch.predictedMove) >= self.filter.minMove)
        .filter(value => value.quoteData.averageDailyVolume >= self.filter.minVolume)
        .filter(value => !value.quoteData.marketCapitalization.endsWith('M'))
        .sort(sortByPredictedMove);
      self.update();
    }

    function sortByAverageDailyVolume (a, b) {
      let keyA = a.quoteData.averageDailyVolume;
      let keyB = b.quoteData.averageDailyVolume;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    }

    function sortByPredictedMove (a, b) {
      let keyA = parseInt(a.earningsResearch.predictedMove);
      let keyB = parseInt(b.earningsResearch.predictedMove);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    }

    function getEarningsData (dateString) {
      const requestUrl = `https:\/\/s3-us-west-1.amazonaws.com/earnings-data/${dateString}.json`;
      request(requestUrl, (response) => {
        self.earnings = JSON.parse(response);
        filter();
      });
    }

    this.on('mount', () => {
      getEarningsData(opts.date);
    });
  </script>
</report>
