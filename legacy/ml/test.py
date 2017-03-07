import numpy as np
from talib.abstract import *

inputs = {
    'open': np.random.random(100),
    'high': np.random.random(100),
    'low': np.random.random(100),
    'close': np.random.random(100),
    'volume': np.random.random(100)
}

sma5 = SMA(inputs, timeperiod=5)
sma10 = SMA(inputs, timeperiod=10)
sma20 = SMA(inputs, timeperiod=20)
sma50 = SMA(inputs, timeperiod=50)

ema5 = EMA(inputs, timeperiod=5)
ema10 = EMA(inputs, timeperiod=10)
ema20 = EMA(inputs, timeperiod=20)
ema50 = EMA(inputs, timeperiod=50)

rsi14 = RSI(inputs, timeperiod=14)

mfi14 = MFI(inputs, timeperiod=14)

# overlap studies
# momentum indicators
# volatility indicators

output = SMA(inputs, timeperiod=25) # calculate on close prices by default
output = SMA(inputs, timeperiod=25, price='open') # calculate on opens
upper, middle, lower = BBANDS(inputs, 20, 2, 2)
slowk, slowd = STOCH(inputs, 5, 3, 0, 3, 0) # uses high, low, close by default
slowk, slowd = STOCH(inputs, 5, 3, 0, 3, 0, prices=['high', 'low', 'open'])

# print(integer, integer2)
print(inputs['open'])
