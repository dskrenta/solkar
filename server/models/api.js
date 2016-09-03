'use strict';
import Observable from 'riot-observable';
import square from '../api/square';
import { earnings } from '../scrapper/earnings';

export default Observable({
  getEarningsData(input, ctx) {
    earnings().then(result => {
      this.trigger('api.getEarningsData:done', ctx, result);
    });
  },
  square(input, ctx) {
    square(input).then(result => {
      this.trigger('api.square:done', ctx, result);
    });
  }
});
