<app>
  <a href="#/login">login</a>
  <a href="#/mapview">mapview</a>
  <a href="#/earnings">Earnings</a>

  <div id="view"></div>

  <script>
    riot.route((page) => {
      if (!page) {
        riot.mount('#view', 'login');
      } else {
        riot.mount('#view', page);
      }
    });
  </script>
</app>
