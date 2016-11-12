<options-chain>
  <div class="container">
    <h1>Options Chain</h1>

    <form class="input-form" onsubmit={ handler }>
      <div class="form-group">
        <input type="text" class="form-input" placeholder="symbol"></input>
        <button type="submit" class="btn btn-primary input-group-btn btn-block">Update</button>
      </div>
    </form>
  </div>

  <script>
    const self = this;

    handler (event) {
      getOptionChain(event.target[0].value);
    }

    function getOptionChain (symbol) {
      self.request(`${window.location.origin}/options/${symbol}`, (response) => {
        response = response.replace(/(\w+:)(\d+\.?\d*)/g, '$1\"$2\"');
        response = response.replace(/(\w+):/g, '\"$1\":');
        console.log(response);
        self.data = JSON.parse(response);
      });
    }
  </script>
</options-chain>
