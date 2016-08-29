<app>
  <dash-header></dash-header>

  <a href="#/login">login</a>
  <a href="#/mapview">mapview</a>
  <a href="#/earnings">Earnings</a>
  <a href="#/article-table">article</a>

  <div id="view"></div>

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
