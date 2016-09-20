<modal-large>

  <button onclick="{open}">Modal</button>

  <div if={show} class="overlay">
    <div class="inner">
      <div class="text">
        <yield/>
      </div>
      <div class="menu">
        <button onclick="{close}">Close</button>
      </div>
    </div>
  </div>

  <style scoped>
    button { height: 50px; width: 150px; border: 2px solid blue; background: none; border-radius: 25px; font-size: 20px; color: blue; }
    button:hover { background: blue; color: white; }
    .overlay { width: 100%; height: 100vh; background: rgba(0,0,0,0.3); position: fixed; top: 0; left: 0; z-index: 2000; }
    .inner { width: 95%; max-width: 740px; margin-top: 150px; margin-left: auto; margin-right: auto; background: #fefefe; vertical-align: middle; border-radius: 5px; }
    .text { padding: 1px 20px 15px; }
    .text h1 { font-size: 35px; margin-bottom: 15px; }
    .text p { font-size: 18px; }
    .menu { padding: 20px; padding-top: 1px; }
  </style>

  <script>
    this.show = false;
    open() { this.show = true; };
    close() { this.show = false; };
  </script>

</modal-large>
