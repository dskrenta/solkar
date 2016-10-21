<article-table>

  <modal-large hello="hello bryce">
    <h1>Heading</h1>
    <p>This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.</p>
  </modal-large>

  <modal-large>
    <h1>Heading 4</h1>
    <p>This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a
      paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph. This is a paragraph.</p>
  </modal-large>

  <div class="article">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>url</th>
          <th>snippet</th>
          <th>time</th>
          <th>sentiment</th>
          <th>keywords</th>
          <th>symbols</th>
        </tr>
      </thead>
      <tbody>
        <tr each={articles}>
          <td>{ id }</td>
          <td>{ title }</td>
          <td>{ url }</td>
          <td>{ snippet }</td>
          <td>{ time }</td>
          <td>{ sentiment }</td>
          <td>{ keywords }</td>
          <td>{ symbols }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <editor></editor>

  <script>
    this.articles = [
      {
        id: '1',
        title: 'stuff',
        url: 'google.com',
        snippet: 'news article content one',
        time: '12:00',
        sentiment: '0.82',
        keywords: ['Stock', 'Money', 'Winning'],
        symbols: ['AAPL', 'TWLO', 'LN']
      }, {
        id: '2',
        title: 'more stuff',
        url: 'facebook.com',
        snippet: 'news article content two',
        time: '13:00',
        sentiment: '0.82',
        keywords: ['Stock', 'Money', 'Winning'],
        symbols: ['AAPL', 'TWLO', 'LN']
      }, {
        id: '3',
        title: 'even more stuff',
        url: 'twitter.com',
        snippet: 'news article content three',
        time: '16:00',
        sentiment: '0.82',
        keywords: ['Stock', 'Money', 'Winning'],
        symbols: ['AAPL', 'TWLO', 'LN']
      }
    ];
  </script>

</article-table>
