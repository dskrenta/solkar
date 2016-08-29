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
    const localStorageKey = 'earningsData';
    this.items = [];

    function getEarningsData () {
      return new Promise((resolve, reject) => {
        socket.on('api.getEarningsData:done', resolve);
        socket.emit('api.getEarningsData');
      });
    }

    function getDate () {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}}`;
    }

    this.on('mount', () => {
      const jsonData = localStorage.getItem(localStorageKey);
      const data = JSON.parse(jsonData);
      if (jsonData === null || data.timestamp !== getDate()) {
        getEarningsData().then(result => {
          this.items = result;
          this.update();
          const storeObject = {
            data: result,
            timestamp: getDate()
          };
          localStorage.setItem(localStorageKey, JSON.stringify(storeObject));
        });
      } else {
        this.items = data.data;
        this.update();
      }
    });

  </script>
</earnings>
