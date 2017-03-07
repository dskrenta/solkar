<modal-large>

  <button onclick={open} class="modal-trigger">Modal</button>

  <div if={show} class="overlay">
    <div class="inner">
      <div class="text">
        <yield/>
      </div>
      <div class="menu">
        <button onclick={close} class="close-button">Close</button>
      </div>
    </div>
  </div>

  <style scoped>
    .close-button { height: 40px; width: 100px; background: none; font-size: 18px; color: #333; border: none; border-radius: 5px; }
    .close-button:hover { background: #d9d9d9; }
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
    this.on('mount', () => {
      console.log(opts.hello);
    });
  </script>

</modal-large>
