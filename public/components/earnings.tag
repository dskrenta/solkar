<earnings>

  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>EPS Estimate*</th>
        <th>Time</th>
        <th>Average Daily Volume</th>
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
        <td>{ averageEarningsSuprise ? averageEarningsSuprise.toPrecision(4) : 'N/A' }</td>
        <td>{ quoteData.lastTradePriceOnly }</td>
      </tr>
    </tbody>
  </table>

  <script>
    const self = this;
    const socket = io();
    this.items = [];

    function volumeSort () {
      self.items = self.items
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

    yahooFinanceURL (symbol) {
      return `http:\/\/finance.yahoo.com/quote/${symbol}?p=${symbol}`;
    }

    function getEarningsData () {
      return new Promise((resolve, reject) => {
        socket.on('api.getEarningsData:done', resolve);
        socket.emit('api.getEarningsData', new Date('September 6, 2016').toString());
      });
    }

    function getDate () {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}}`;
    }

    this.on('mount', () => {
      getEarningsData().then(result => {
        console.log(JSON.stringify(result, null, '\t'));
        self.items = result;
        volumeSort();
        self.update();
      });
    });

  </script>
</earnings>
