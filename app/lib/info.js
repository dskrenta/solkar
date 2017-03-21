import quoth from 'quoth';

export function info (symbol) {
  return new Promise((resolve, reject) => {
    quoth.spot(symbol, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}
