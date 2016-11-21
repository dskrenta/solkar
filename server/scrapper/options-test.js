'use strict';
import options from './options';

options()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
