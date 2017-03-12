<clock>
  <span>{dateTime}</span>

  <script>
    const self = this;
    this.dateTime = 0;

    this.on('mount', () => {
      getTime();
    });

    function getTime () {
      const dateTime = new Date();
      self.dateTime = `${dateTime.toLocaleDateString()}
      ${formatHour(dateTime.getHours())}:${format60(dateTime.getMinutes())}:${format60(dateTime.getSeconds())}
      ${ampm(dateTime.getHours())}`;
      self.update();
      setTimeout(getTime, 500);
    }

    function format60 (value) {
      return value < 10 ? `0${value}` : value;
    }

    function formatHour (hour) {
      return hour > 12 ? (hour - 12) : hour > 0 ? hour : 12;
    }

    function ampm (hour) {
      return hour >= 12 ? 'PM' : 'AM';
    }

  </script>
</clock>
