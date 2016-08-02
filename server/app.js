'use strict';
import Koa from 'koa';
import fs from 'fs';

const app = new Koa();
const PORT = 3000;

app.use(async ctx => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => console.log(`Server started on *:${PORT}`));

export default app;
