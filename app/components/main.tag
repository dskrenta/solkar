<main>
  <div class="container row">
    <div class="container column one">
      <header></header>
      <sidebar></sidebar>
      <clock></clock>
    </div>
    <div class="container column two">
      <data></data>
      <!--<chart></chart>-->
      <demo></demo>
    </div>
    <div class="container column three">
      <pred></pred>
    </div>
  </div>

  <script>
    this.on('mount', () => {
      observe.trigger('quote-select', 'SPY');
    });
  </script>
</main>
