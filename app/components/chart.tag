<chart>
  <script>
    const self = this;
    this.symbol = 'SPY';

    this.on('mount', () => {
      const parent = document.querySelector('chart');
      self.width = parent.offsetWidth;
      self.height = parent.offsetHeight;
    });

    observe.on('quote-select', symbol => {
      self.symbol = symbol;
      clearChart();
      self.update();
    });

    observe.on('quote-update:historicalData', data => {
      self.data = adjustHistoricalData(data);
      const chart = createChart();
      candlestickChart(chart, self.data, self.width, self.height);
      // candlesticks(chart, self.data, self.width, self.height);
      // volumeBars(chart, self.data, self.width, self.height);
    });

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

    function chartInit () {
      // createChart();
      // candlesticks();
      // volumeBars();
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

    function candlestickChart (chart, data, width, height) {
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.2)
        .domain(self.data.map((d, index) => index));

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

    function volumeBars (chart, data, width, height) {
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.4)
        .domain(data.map((d, index) => index));

      const y = d3.scaleLinear()
        .domain([d3.max(data, d => d.volume), d3.min(data, d => d.volume)])
        .range([(height / 2), height]);

      const bars = chart.selectAll('.bars')
        .data(data)
        .enter();

      bars.append('svg:rect')
        .attr('x', (d, index) => x(index))
        .attr('y', d => y(d.volume))
        .attr('width', x.bandwidth())
        .attr('height', d => y(d.volume))
        .attr('fill', 'grey')
        .attr('shape-rendering', 'crispEdges');
    }

    function candlesticks (chart, data, width, height) {
      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.4)
        .domain(self.data.map((d, index) => index));

      const y = d3.scaleLinear()
        .domain([d3.max(data, d => d.high), d3.min(data, d => d.low)])
        .range([0, (height / 2)]);

      const candle = chart.selectAll('.candle')
        .data(data)
        .enter();

      candle.append('svg:line')
        .attr('x1', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y1', d => y(d.high))
        .attr('x2', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y2', d => y(d.low))
        .attr('stroke-width', '0.5')
        .attr('stroke', d => candleColor(y(d.open), y(d.close)))
        .attr('shape-rendering', 'crispEdges');

      candle.append('svg:rect')
        .attr('x', (d, index) => x(index))
        .attr('y', d => candleY(y(d.open), y(d.close)))
        .attr('width', x.bandwidth())
        .attr('height', d => candleHeight(y(d.open), y(d.close)))
        .attr('fill', d => candleColor(y(d.open), y(d.close)))
        .attr('shape-rendering', 'crispEdges');
    }

    /*
    function candlesticks () {
      const width = self.width;
      const height = self.height;

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(self.data.map((d, index) => index));
      const y = d3.scaleLinear()
        .domain([d3.max(self.data, d => d.high), d3.min(self.data, d => d.low)])
        .range([0, (height / 2)]);

      const chart = d3.select('chart')
        .append('svg:svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'chart');

      const candle = chart.selectAll('.candle')
        .data(self.data)
        .enter();

      candle.append('svg:line')
        .attr('x1', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y1', d => y(d.high))
        .attr('x2', (d, index) => x(index) + x.bandwidth() / 2)
        .attr('y2', d => y(d.low))
        .attr('stroke-width', '0.5')
        .attr('stroke', d => candleColor(y(d.open), y(d.close)))
        .attr('shape-rendering', 'crispEdges');

      candle.append('svg:rect')
        .attr('x', (d, index) => x(index))
        .attr('y', d => candleY(y(d.open), y(d.close)))
        .attr('width', x.bandwidth())
        .attr('height', d => candleHeight(y(d.open), y(d.close)))
        .attr('fill', d => candleColor(y(d.open), y(d.close)))
        .attr('shape-rendering', 'crispEdges');
    }
    */

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
