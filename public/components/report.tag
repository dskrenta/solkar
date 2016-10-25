<report>
  <h3>{ date }</h3>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>EPS Estimate</th>
        <th>Time</th>
        <th>Average Daily Volume</th>
        <th>Predicted Move</th>
        <th>Average Historical Earnings Suprise</th>
        <th>Last Trade</td>
      </tr>
    </thead>
    <tbody>
      <tr each={ items }>
        <td><a href={ yahooFinanceURL(symbol) } target="_blank">{ company }</a></td>
        <td>{ symbol }</td>
        <td>{ eps }</td>
        <td>{ time }</td>
        <td>{ quoteData.averageDailyVolume ? quoteData.averageDailyVolume : 'N/A' }</td>
        <td>{ earningsResearch.predictedMove }</td>
        <td>{ averageEarningsSuprise ? averageEarningsSuprise.toPrecision(4) : 'N/A' }</td>
        <td>{ quoteData.lastTradePriceOnly }</td>
      </tr>
    </tbody>
  </table>

  <script>
    const self = this;
    this.items = [];

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

    function volumeSort () {
      self.items = self.items
        .filter(value => value.earningsResearch ? value['earningsResearch']['predictedMove'] : false)
        .filter(value => parseInt(value.earningsResearch.predictedMove) >= 5)
        .filter(value => value.quoteData.averageDailyVolume > 250000)
        .sort(sortByAverageDailyVolume)
        .reverse();
    }

    function sortByAverageDailyVolume (a, b) {
      let keyA = a.quoteData.averageDailyVolume;
      let keyB = b.quoteData.averageDailyVolume;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    }

    function getEarningsData (dateString) {
      const requestUrl = `https:\/\/s3-us-west-1.amazonaws.com/earnings-data/${dateString}.json`;
      request(requestUrl, (response) => {
        self.items = JSON.parse(response);
        volumeSort();
        self.update();
      });
    }

    this.on('mount', () => {
      getEarningsData(opts.date);
    });
  </script>
</report>
