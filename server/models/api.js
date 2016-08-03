'use strict';
import Observable from 'riot-observable';
import square from '../api/square';

export default Observable({
  square(input, ctx) {
    square(input).then((result) => {
      this.trigger('api.square:done', ctx, result);
    });
  }
});
