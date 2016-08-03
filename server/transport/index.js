'use strict';
import Socket from 'koa-socket';
import api from '../models/api.js';
const io = new Socket();

export default (app) => {
  io.attach(app);

  const emit = (event) => {
    return (ctx, ...args) => ctx.socket.emit(event, ...args);
  };

  const pipe = (observable, event) => {
    observable.on(event, emit(event));
  };

  const observe = (event, method, that) => {
    io.on(event, (ctx, data) => method.call(that, data, ctx))
  };

  pipe(api, 'api.square:done');
  observe('api.square', api.square, api);
}
