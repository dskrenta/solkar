'use strict';
const talib = require('talib');

const def = talib.explain('SAR');

for (let input of def.optInputs) {
  console.log(input.name, input.defaultValue);
}

// console.log(def.name, def.hint, def.group, def.optInputs);
