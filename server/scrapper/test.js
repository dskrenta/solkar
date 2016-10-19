import { earnings, getEarningsHistory, getEarningsResearch } from './earnings';

earnings('20161014')
  .then((result) => {
    console.log(JSON.stringify(result, null, '\t'));
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
