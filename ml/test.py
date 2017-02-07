import numpy as np
import talib

close = np.random.random(100)
output = talib.SMA(close)
mom = talib.MOM(close, timeperiod=5)

print(output)
print(mom)

upper, middle, lower = talib.BBANDS(close, matype=talib.MA_Type.T3)
print(upper, middle, lower)

print(talib.get_functions())
