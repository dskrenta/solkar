<earnings>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>EPS Estimate*</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr each={items}>
        <td>{ company }</td>
        <td>{ symbol }</td>
        <td>{ eps }</td>
        <td>{ time }</td>
      </tr>
    </tbody>
  </table>

  <script>
    const socket = io();
    this.items = [];

    function getEarningsData () {
      return new Promise((resolve, reject) => {
        socket.on('api.getEarningsData:done', resolve);
        socket.emit('api.getEarningsData');
      });
    }

    this.on('mount', () => {
      getEarningsData().then(result => {
        this.items = result;
        this.update();
      });
    })

  </script>
</earnings>
