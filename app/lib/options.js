export async function options (symbol, expiration = null) {
  try {
    const jsonBody = await getOptionChain(symbol, expiration);
    return JSON.parse(jsonBody);
  } catch (err) {
    console.log(err);
  }
}

function getOptionChain (symbol, expiration) {
  return new Promise((resolve, reject) => {
    let url = `https:\/\/query2.finance.yahoo.com/v7/finance/options/${symbol}`;
    if (expiration) url += `?date=${expiration}`;
     request(url, (error, response, body) => {
       if (error) {
         reject(error);
       } else {
         resolve(body);
       }
     });
  });
}
