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

    observe.on('quote-update:marketData', data => {
      self.data = data;
      console.log(data);
      self.update();
    });
  </script>
</data>
