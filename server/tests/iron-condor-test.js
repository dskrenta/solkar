'use strict';
import ironCondor from '../api/iron-condor';

ironCondor('fb', 1484870400)
  .then(result => {
    // console.log(`ironCondor result: ${JSON.stringify(result)}`);
    for (let i = 0; i < result.length; i++) {
      console.log(`maxProfit: ${result[i].maxProfit}, maxLoss: ${result[i].maxLoss}, probabilityOfProfit: ${result[i].probabilityOfProfit}, riskRewardRatio: ${result[i].riskRewardRatio}, upperBreakeven: ${result[i].upperBreakeven}, lowerBreakeven: ${result[i].lowerBreakeven}`);
      // console.log(JSON.stringify(result[i].contracts));
    }
  }).catch(err => {
    console.log(err);
  });
