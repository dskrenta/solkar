<dropdown>

  <a href="#" class="dropdown-toggle" role="button" onclick={ toggle }>Dropdown <span class="caret"></span></a>
  <ul class="dropdown-menu" show={ dropdown }>
    <yield />
  </ul>

  <style scoped>
    .dropdown-menu { display: inline; }
  </style>

  <script>
    this.dropdown = false;

    toggle () {
      this.dropdown ? this.dropdown = false : this.dropdown = true;
      this.update();
    }
  </script>
</dropdown>
