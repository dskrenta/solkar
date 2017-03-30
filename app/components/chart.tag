<chart>
  <select onchange={periodSelect}>
    <option value="12">1 Year</option>
    <option value="6">6 Months</option>
    <option value="3">3 Months</option>
    <option value="1">1 Month</option>
  </select>

  <script>
    const self = this;
    this.symbol = 'SPY';
    this.period = 12;

    this.on('mount', () => {
      const parent = document.querySelector('chart');
      self.width = parent.offsetWidth;
      self.height = parent.offsetHeight;
    });

    observe.on('quote-select', symbol => {
      clearChart();
    });

    observe.on('quote-update:historicalData', data => {
      self.data = adjustHistoricalData(data);
      chartInit();
    });

    periodSelect (event) {
      self.period = parseInt(event.target.value);
      chartInit();
    }

    function chartInit () {
      clearChart();
      candlestickChart(createChart(), self.data, self.period, self.width, self.height);
    }

    function adjustHistoricalData (data) {
      for (let i = 0; i < data.length; i++) {
        const adjRatio = data[i].adjClose / data[i].close;
        data[i].volume = data[i].volume / adjRatio;
        data[i].open = data[i].open * adjRatio;
        data[i].high = data[i].high * adjRatio;
        data[i].low = data[i].low * adjRatio;
        data[i].close = data[i].close * adjRatio;
      }
      return data;
    }

    function clearChart () {
      d3.select('#chart').remove();
    }

    function createChart () {
      const chart = d3.select('chart')
        .append('svg:svg')
        .attr('width', self.width)
        .attr('height', self.height)
        .attr('id', 'chart');
      return chart;
    }

    function candlestickChart (chart, inputData, period, width, height) {
      const data = inputData.slice(-(period * 20));

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.2)
        .domain(data.map((d, index) => index));

      const yCandle = d3.scaleLinear()
        .domain([d3.max(data, d => d.high), d3.min(data, d => d.low)])
        .range([0, (height / 2)]);

      const yVolume = d3.scaleLinear()
        .domain([d3.max(data, d => d.volume), d3.min(data, d => d.volume)])
        .range([(height / 2), height]);

      const candle = chart.selectAll('.candle')
        .data(data)
        .enter();

      // wicks
      candle.append('svg:line')
        .attr('x1', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y1', d => yCandle(d.high))
        .attr('x2', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y2', d => yCandle(d.low))
        .attr('stroke-width', '0.5')
        .attr('stroke', d => candleColor(yCandle(d.open), yCandle(d.close)))
        .attr('shape-rendering', 'crispEdges');

      // candle bodies
      candle.append('svg:rect')
        .attr('x', (d, index) => x(index))
        .attr('y', d => candleY(yCandle(d.open), yCandle(d.close)))
        .attr('width', x.bandwidth())
        .attr('height', d => candleHeight(yCandle(d.open), yCandle(d.close)))
        .attr('fill', d => candleColor(yCandle(d.open), yCandle(d.close)))
        .attr('shape-rendering', 'crispEdges');

      // volume bars
      candle.append('svg:rect')
        .attr('x', (d, index) => x(index))
        .attr('y', d => yVolume(d.volume))
        .attr('width', x.bandwidth())
        .attr('height', d => yVolume(d.volume))
        .attr('fill', 'grey')
        .attr('shape-rendering', 'crispEdges');
    }

    function candleY (open, close) {
      return open < close ? open : close;
    }

    function candleColor (open, close) {
      return open > close ? 'green' : 'red';
    }

    function candleHeight (open, close) {
      return open < close ? close - open : open - close;
    }
  </script>
</chart>
