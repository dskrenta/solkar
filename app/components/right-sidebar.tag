<right-sidebar>
  <div class="container row itemsStart around">
    <h3>Volume<br />{marketData.volume}</h3>
    <h3>Avg. Volume<br />{marketData.averageDailyVolume}</h3>
  </div>
  <div class="container row itemsStart around">
    <h3>Day's Range<br /> {marketData.daysRange}</h3>
    <h3>52 Week Range<br /> {marketData['52WeekRange']}</h3>
  </div>
  <div class="container row itemsStart around">
    <h3>Dividend<br /> {marketData.dividendPayDate ? marketData.dividendPayDate : 'N/A'}</h3>
    <h3>Earnings<br /> {earningsData.date ? earningsData.date : 'N/A'}</h3>
  </div>
  <div class="container row itemsStart around">
    <h3>ADX<br /> pending</h3>
    <h3>SMA<br /> pending</h3>
  </div>

  <script>
    const self = this;
    this.marketData;

    observe.on('quote-update:marketData', data => {
      self.marketData = data;
      self.update();
    });

    observe.on('quote-update:earningsData', data => {
      self.earningsData = data;
      self.update();
    });

    observe.on('quote-update:realtime', data => {
      self.marketData.volume = data.volume;
      self.update();
    });

    observe.on('technicalAnalysisUpdate', data => {
      console.log(data);
    });
  </script>
</right-sidebar>
