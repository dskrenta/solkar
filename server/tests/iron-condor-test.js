'use strict';
import ironCondor from '../api/iron-condor';

ironCondor('aapl')
  .then(result => {
    console.log(`ironCondor result: ${JSON.stringify(result)}`);
  }).catch(err => {
    console.log(err);
  });
