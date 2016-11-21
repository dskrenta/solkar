<tracker>
  <div class="container maru">
    <form onsubmit={ add }>
      <div class="columns">
        <div class="column col-3"></div>
        <div class="column col-6 center">
          <label class="form-label" for="input1">Add Miles</label>
          <input type="number" class="form-input input-lg" placeholder="Milage" id="miles" />
        </div>
        <div class="column col-3"></div>
      </div>
      <div class="columns">
        <div class="column col-3"></div>
        <div class="column col-6 center">
          <label class="form-label" for="input1">Add Gas Consumed</label>
          <input type="number" class="form-input input-lg" placeholder="Gas" id="gas" />
        </div>
        <div class="column col-3"></div>
      </div>
      <div class="columns">
        <div class="column col-3"></div>
        <div class="column col-6 center">
          <button type="submit" class="btn btn-primary btn-lg input-group-btn btn-block">Update</button>
        </div>
        <div class="column col-3"></div>
      </div>
    </form>
  </div>
  <div class="container">
    <div class="columns">
      <div class="col-3"></div>
      <div class="averagetext center col-3">
        <h1>{ avg } <small class="label"> Avg. </small></h1>
      </div>
      <div class="costtext center col-3">
        <h1>{ cpm } <small class="label"> CPM </small></h1>
      </div>
      <div class="col-3"></div>
    </div>
  </div>

  <script>
  const self = this;
  const data = {
    totgas: 0,
    mile: 0
  };
  let avg = 0;
  let cpm = 0;
  console.log("hello");
  add(event) {
    console.log(event.target.value[0], event.target.value[1]);
    data.totgas += event.target.value[1];
    data.mile +=  event.target.value[0];
    console.log(data.totgas);
    console.log(data.mile);
    avg = data.mile / data.gas;
    cpm = avg * 3.00;
    self.gas.value = '';
    self.miles.value = '';
    return avg, cpm;
  }
  </script>

  <style> .maru { margin-top: 200px; } .center { display:flex; justify-content:center; align-items:center; } .center form, input { width: 100%!important; }</style>

</tracker>
