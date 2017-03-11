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
      self.dateTime = `${dateTime.toLocaleDateString()} ${dateTime.getHours()}:${formatTime(dateTime.getMinutes())}:${formatTime(dateTime.getSeconds())} PM`;
      self.update();
      setTimeout(getTime, 500);
    }

    function formatTime(value) {
      return value < 10 ? `0${value}` : value;
    }

  </script>
</clock>
