import { earnings, getEarningsHistory, getEarningsResearch } from './earnings';

earnings('20161110')
  .then((result) => {
    // console.log(JSON.stringify(result, null, '\t'));
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.log(error);
  });

/*
getEarningsResearch('aapl')
  .then((result) => {
    console.log(JSON.stringify(result, null, '\t'));
  })
  .catch((error) => {
    console.log(error);
  });
*/
