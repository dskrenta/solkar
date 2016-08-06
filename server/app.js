'use strict';
import Koa from 'koa';
import fs from 'fs';
import serveStatic from 'koa-serve-static';
import Socket from './transport';
import router from './routes/demo';

const app = new Koa();
const PORT = 3000;

app
  .use(router.routes())
  .use(serveStatic(`${__dirname}/../public`));

const socket = Socket(app);
app.listen(PORT, () => console.log(`Server started on *:${PORT}`));

export default app;
