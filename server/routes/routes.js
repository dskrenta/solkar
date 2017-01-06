'use strict';
import Router from 'koa-router';
import options from '../api/options-chain';
import ironCondor from '../api/iron-condor';
const router = new Router();

router
  .get('/options/:symbol/:expiration?', async (ctx, next) => {
    try {
      const optionsChain = await options(ctx.params.symbol, ctx.params.expiration);
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify(optionsChain);
    } catch (err) {
      ctx.body = err;
    }
  })
  .get('/iron-condor/:symbol/:expiration?', async (ctx, next) => {
    try {
      const ironCondors = await ironCondor(ctx.params.symbol, ctx.params.expiration);
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify(ironCondors);
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
