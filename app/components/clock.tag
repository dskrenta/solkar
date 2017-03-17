<clock class="container itemsCenter center">
  <span>{dateTime}</span>

  <script>
    const self = this;
    this.dateTime = 0;

    this.on('mount', () => {
      getTime();
    });
    // Removed temporarily from first line of 'self.datTime = ...' ${dateTime.toLocaleDateString()}
    function getTime () {
      const dateTime = new Date();
      self.dateTime = `${formatHour(dateTime.getHours())}:${format60(dateTime.getMinutes())}:${format60(dateTime.getSeconds())}
      ${ampm(dateTime.getHours())}`;
      self.update();
      setTimeout(getTime, 500);
    }

    function format60 (value) {
      return value < 10 ? `0${value}` : value;
    }

    function formatHour (hour) {
      console.log(hour);
      return hour > 12 ? (hour - 12) : hour > 0 ? hour : 12;
    }

    function ampm (hour) {
      return hour >= 12 ? 'PM' : 'AM';
    }

  </script>
</clock>
