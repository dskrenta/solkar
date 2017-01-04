'use strict';
import Router from 'koa-router';
import options from '../api/options-chain';
const router = new Router();

router
  .get('/options/:symbol', async (ctx, next) => {
    try {
      let optionsChain = await options(ctx.params.symbol);
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify(optionsChain);
    } catch (err) {
      ctx.body = err;
    }
  })
  .get('/stuff', (ctx, next) => {
    ctx.body = 'Demo!';
  })
  .post('/users', (ctx, next) => {
    console.log('stuff');
  })
  .put('/users/:id', (ctx, next) => {
    console.log('stuff');
  })
  .del('/users/:id', (ctx, next) => {
    console.log('stuff');
  });

export default router;
