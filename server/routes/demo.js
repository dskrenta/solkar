'use strict';
import Router from 'koa-router';

const router = new Router();

router
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
