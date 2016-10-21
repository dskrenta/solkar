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
        switch (page) {
          case 'earnings':
            // get date from url
            riot.mount('#view', page, {date: option});
            break;
          default:
            riot.mount('#view', page);
            break;
        }
      }
    });
  </script>
</app>
