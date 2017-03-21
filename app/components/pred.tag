<pred>
  <h1>Pred</h1>

  <script>
    const self = this;
    this.data = '';

    observe.on('quote-update', data => {
      self.data = data.marketData;
      console.log(data);
      self.update();
    });
  </script>
</pred>
