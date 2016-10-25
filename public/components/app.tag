<app>
  <dash-header></dash-header>
  <div class="container">
    <div id="view"></div>
  </div>

  <script>
    const defaultTag = 'earnings';
    riot.mount('dash-header');
    riot.route((page, option) => {
      if (!page) {
        riot.mount('#view', defaultTag);
      } else {
        if (page === 'earnings' || page === 'report') {
          riot.mount('#view', page, {date: option});
        } else {
          riot.mount('#view', page);
        }
      }
    });
  </script>
</app>
