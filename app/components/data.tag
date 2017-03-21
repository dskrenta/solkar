<data>
  <div class="container row itemsStart around">
    <h3>{data.symbol}</h3>
    <h3>Bid<br /> {data.bid ? data.bid : 0}</h3>
    <h3>Ask<br /> {data.ask ? data.ask : 0}</h3>
    <h3>Last<br /> {data.lastTradePriceOnly}</h3>
    <h3 class="down">Chg<br /> {data.change ? data.change : 0.00}</h3>
    <h3>{data.name}</h3>
  </div>

  <script>
    const self = this;
    self.data;

    observe.on('quote-update:marketData', data => {
      self.data = data;
      console.log(data);
      self.update();
    });

    observe.on('quote-update:realtime', data => {
      self.data.bid = `${data.bidPrice} x ${data.bidSize}`;
      self.data.ask = `${data.askPrice} x ${data.askSize}`;
      self.data.lastTradePriceOnly = data.lastSalePrice;
      self.data.change = parseFloat((self.data.previousClose - data.lastSalePrice).toFixed(4));
      self.update();
    });
  </script>
</data>
