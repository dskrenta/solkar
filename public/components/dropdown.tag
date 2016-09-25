<dropdown>

  <a onclick={ toggle }>Dropdown</a>
  <div if={show} class="dropdown-menur">
    <ul>
      <yield />
    </ul>
  </div>

  <style scoped>
    .dropdown-menur { padding: 20px;  }
    .dropdown-menur li { text-decoration: none; height: 25px; line-height: 25px; font-size: 14px; border-top: 1px solid grey; }
    .dropdown-menur li:first-child { border: none; }
  </style>

  <script>
    const self = this;
    this.show = false;

    toggle () {
      self.update({show: !self.show});
      console.log(self.show);
    }
  </script>
</dropdown>
