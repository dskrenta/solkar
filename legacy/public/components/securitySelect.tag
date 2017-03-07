<securitySelect>

  <div class="securitySelection container980">
    <div class="securityList">
      <div>Name</div>
      <div>Symbol</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
    <div class="securityList">
      <div class="one">

      </div>
      <div class="two">

      </div>
      <div class="three">

      </div>
    </div>

    <!--

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr each={ company } class="selected">
          <td>{ name }</td>
          <td>{ symbol }</td>
          <td>{ strategy1 } - { profit1 }</td>
          <td>{ strategy2 } - { profit2 }</td>
          <td>{ strategy3 } - { profit3 }</td>
        </tr>
      </tbody>
    </table>

  -->

  </div>

  <script>
  const securities = {
    company: {
      symbol: "AAPL",
      name: "Apple",
      strategy1: "Iron Condor",
      profit1: "$69",
      strategy2: "Chicken Iron Condor",
      profit2: "$54",
      strategy3: "Iron Butterfly",
      profit3: "$41"
    },

  };
  </script>

  <style scoped>
  .container980 {
    margin-top: 100px;
  }
  </style>

</securitySelect>
