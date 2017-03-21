<sidebar>
  <div class="title">
    <h3>ETFs</h3>
  </div>
  <div each={etfPresets} class="item container column nowrap">
    <div class="container row itemsCenter nowrap" onclick={quoteSelect}>
      <p strong>{symbol}</p>
    </div>
  </div>
  <div class="title">
    <h3>Stocks</h3>
  </div>
  <div each={stockPresets} class="item container column nowrap">
    <div class="container row itemsCenter nowrap" onclick={quoteSelect}>
      <p strong>{symbol}</p>
    </div>
  </div>
  <script>
    const self = this;
    this.etfPresets = lib.presets.etfs;
    this.stockPresets = lib.presets.stocks;

    quoteSelect (event) {
      observe.trigger('quote-select', event.item.symbol);
    }
  </script>
</sidebar>
