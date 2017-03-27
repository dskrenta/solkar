<chart>
  <script>
    const self = this;
    this.symbol = 'SPY';

    this.on('mount', () => {
      const parent = self.root.parentNode;
      self.width = parent.offsetWidth;
      self.height = parent.offsetHeight;
      console.log(self.width, self.height);
    });

    observe.on('quote-select', symbol => {
      self.symbol = symbol;
      clearChart();
      self.update();
    });

    observe.on('quote-update:historicalData', data => {
      self.data = adjustHistoricalData(data);
      chart();
    });

    function adjustHistoricalData (data) {
      for (let i = 0; i < data.length; i++) {
        const adjRatio = data[i].adjClose / data[i].close;
        data[i].volume = data[i].volume / adjRatio;
        data[i].open = data[i].open * adjRatio;
        data[i].high = data[i].high * adjRatio;
        data[i].low= data[i].low * adjRatio;
        data[i].close = data[i].close * adjRatio;
      }
      return data;
    }

    function clearChart () {
      d3.select('#chart').remove();
    }

    function chart () {
      const barWidth = 20;
      // const width = 500;
      const width = self.width;
      const height = 400;

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(self.data.map((d, index) => index));
      const y = d3.scaleLinear()
        .domain([d3.max(self.data, d => d.high), d3.min(self.data, d => d.low)])
        .range([0, height]);

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
