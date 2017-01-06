'use strict';
import options from './options-chain';

export default async function ironCondor (symbol, expiration = null) {
  try {
    const optionChain = await options(symbol, expiration);
    const shortCalls = optionChain.optionChain.result[0].options[0].calls.filter(call => !call.inTheMoney);
    const shortPuts = optionChain.optionChain.result[0].options[0].puts.filter(put => !put.inTheMoney).reverse();
    const ironCondors = [];

    for (let i = 0; i < shortCalls.length; i++) {
      const longPuts = shortPuts.slice(i + 1, shortPuts.length);
      const longCalls = shortCalls.slice(i + 1, shortCalls.length);

      for (let j = 0; j < longCalls.length; j++) {
        const maxProfit = shortCalls[i].lastPrice + shortPuts[i].lastPrice;
        const maxLoss = longCalls[j].strike - shortCalls[i].strike - maxProfit;
        const upperBreakeven = shortCalls[i].strike + maxProfit;
        const lowerBreakeven = shortPuts[i].strike - maxProfit;
        const probabilityOfProfit = maxLoss / (maxProfit + maxLoss);
        const riskRewardRatio = maxProfit / maxLoss;

        const ironCondor = {
          contracts: {
            shortCall: shortCalls[i],
            shortPut: shortPuts[i],
            longCall: longCalls[j],
            longPut: longPuts[j]
          },
          maxProfit: maxProfit,
          maxLoss: maxLoss,
          upperBreakeven: upperBreakeven,
          lowerBreakeven: lowerBreakeven,
          probabilityOfProfit: probabilityOfProfit,
          riskRewardRatio: riskRewardRatio
        };

        if (maxLoss >= 0 && maxProfit >= 0) {
          ironCondors.push(ironCondor);
        }
      }
    }

    return ironCondors;
  } catch (err) {
    console.log(err);
  }
}
