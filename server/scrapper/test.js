import { earnings, getEarningsHistory } from './earnings';

earnings()
  .then((result) => {
    console.log(JSON.stringify(result, null, '\t'));
  })
  .catch((error) => {
    console.log(error);
  });

/*
getEarningsHistory('AAPL')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  })
*/
