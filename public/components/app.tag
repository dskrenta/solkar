<app>

  <div id="view"></div>

  <script>
    // const defaultTag = 'earnings';
    // const defaultTag = 'tracker';
    const defaultTag = 'interface';
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
