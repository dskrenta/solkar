<time-icon>
  <amc if={time === 'After Market Close'} />
  <bmo if={time === 'Before Market Open'} />
  <tns if={time === 'Time Not Supplied'} />

  <script>
    this.time = opts.time;
  </script>
</time-icon>
