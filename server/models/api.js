'use strict';
import Observable from 'riot-observable';
import square from '../api/square';
import getEarnings from '../scrapper/scrapper';

export default Observable({
  getEarningsData(input, ctx) {
    getEarnings().then(result => {
      this.trigger('api.getEarningsData:done', ctx, result);
    });
  },
  square(input, ctx) {
    square(input).then(result => {
      this.trigger('api.square:done', ctx, result);
    });
  }
});
