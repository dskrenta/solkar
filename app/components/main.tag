<main>
  <div class="container row">
    <div class="container column one">
      <header></header>
      <left-sidebar></left-sidebar>
      <clock></clock>
    </div>
    <div class="container column two">
      <data></data>
      <chart></chart>
    </div>
    <div class="container column three">
      <right-sidebar></right-sidebar>
    </div>
  </div>

  <script>
    this.on('mount', () => {
      observe.trigger('quote-select', 'SPY');
    });
  </script>
</main>
