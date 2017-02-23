<dash-header>

  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Solkar</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><a href="#/earnings">Earnings</a></li>
          <li><a href="#/article-table">article</a></li>
          <li><a href="#/interface">Interface</a></li>
            <dropdown>
              <li>Test1</li>
              <li>Test2</li>
              <li>Test3</li>
              <li>Test4</li>
            </dropdown>
        </ul>
        <!--
        <ul class="nav navbar-nav navbar-right">
          <dropdown>
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </dropdown>
        </ul>
        -->
        <!--
        <ul class="nav navbar-nav navbar-right">
          <dropdown class="dropdown">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
          </dropdown>
        </ul>
        -->
        <form class="navbar-form navbar-right">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Search</button>
        </form>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>

  <style scoped>
    :scope {
      // display: inline-block;
      // width: 100%;
    }
  </style>

  <script>
  riot.mount('dropdown')
  </script>
</dash-header>
