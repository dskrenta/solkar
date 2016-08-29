import { getEarnings } from './scrapper';

getEarnings('https://biz.yahoo.com/research/earncal/today.html')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
