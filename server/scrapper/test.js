import earnings from './earnings';

earnings()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
