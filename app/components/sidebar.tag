<sidebar>
  <div class="title">
    <h3><strong>ETFs</strong></h3>
  </div>
  <div each={etfPresets} class="item container column nowrap">
    <div class="container row itemsCenter nowrap" onclick={quoteSelect}>
      <p strong>{symbol}</p>
    </div>
  </div>
  <div class="title">
    <h3><strong>Stocks</strong></h3>
  </div>
  <div each={stockPresets} class="item container column nowrap">
    <div class="container row itemsCenter nowrap" onclick={quoteSelect}>
      <p strong>{symbol}</p>
    </div>
  </div>
  <script>
    self.data;
    this.etfPresets = lib.presets.etfs;
    this.stockPresets = lib.presets.stocks;

    quoteSelect (event) {
      observe.trigger('quote-select', event.item.symbol);
    }
  </script>
</sidebar>
