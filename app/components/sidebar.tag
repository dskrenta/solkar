<sidebar>
  <div class="title">
    <h2><strong>ETFs</strong></h2>
  </div>
  <table>
    <tr>
      <th class="tLeft">Sym</th>
      <th class="tCenter">Last</th>
      <th class="tRight">Chg</th>
    </tr>
    <tr each={etfPresets} class="item" onclick={quoteSelect}>
      <td class="tLeft">{symbol}</td>
      <td class="tCenter">123.45</td>
      <td class="tRight">3.45</td>
    </tr>
  </table>

  <div class="title">
    <h2><strong>Stocks</strong></h2>
  </div>
  <table>
    <tr>
      <th class="tLeft">Sym</th>
      <th class="tCenter">Last</th>
      <th class="tRight">Chg</th>
    </tr>
    <tr each={stockPresets} class="item" onclick={quoteSelect}>
      <td class="tLeft">{symbol}</td>
      <td class="tCenter">123.45</td>
      <td class="tRight">3.45</td>
    </tr>
  </table>

  <script>
    self.data;
    this.etfPresets = lib.presets.etfs;
    this.stockPresets = lib.presets.stocks;

    quoteSelect (event) {
      observe.trigger('quote-select', event.item.symbol);
    }
  </script>
</sidebar>
