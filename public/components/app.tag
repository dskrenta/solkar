<app>
  <dash-header></dash-header>
  <div class="container">
    <div id="view"></div>
  </div>

  <script>
    const defaultTag = 'login';
    riot.mount('dash-header');
    riot.route((page) => {
      if (!page) {
        riot.mount('#view', defaultTag);
      } else {
        riot.mount('#view', page);
      }
    });
  </script>
</app>
