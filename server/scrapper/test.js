import { earnings, getEarningsHistory } from './earnings';

const date = new Date('September 6, 2016');

earnings(date)
  .then((result) => {
    console.log(JSON.stringify(result, null, '\t'));
  })
  .catch((error) => {
    console.log(error);
  });
