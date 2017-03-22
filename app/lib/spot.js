import quoth from 'quoth';

export function spot (symbol) {
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
