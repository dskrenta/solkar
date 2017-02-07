import numpy as np
from talib.abstract import *

inputs = {
    'open': np.random.random(100),
    'high': np.random.random(100),
    'low': np.random.random(100),
    'close': np.random.random(100),
    'volume': np.random.random(100)
}

output = SMA(inputs, timeperiod=25) # calculate on close prices by default
output = SMA(inputs, timeperiod=25, price='open') # calculate on opens
upper, middle, lower = BBANDS(inputs, 20, 2, 2)
slowk, slowd = STOCH(inputs, 5, 3, 0, 3, 0) # uses high, low, close by default
slowk, slowd = STOCH(inputs, 5, 3, 0, 3, 0, prices=['high', 'low', 'open'])

print(output, upper, middle, lower, slowk, slowd)
