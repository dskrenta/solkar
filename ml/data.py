import json
import numpy as np
from talib.abstract import *
from sklearn import svm
# import matplotlib.pyplot as plt

np.set_printoptions(threshold=np.inf)

def get_data(file_name):
    data_file = open(file_name, encoding='utf-8')
    data = json.loads(data_file.read())
    return data

def format_data(data):
    return {
        'open': np.array(list(map(lambda d: d['open'], data)), dtype='f8'),
        'high': np.array(list(map(lambda d: d['high'], data)), dtype='f8'),
        'low': np.array(list(map(lambda d: d['low'], data)), dtype='f8'),
        'close': np.array(list(map(lambda d: d['close'], data)), dtype='f8'),
        'volume': np.array(list(map(lambda d: d['volume'], data)), dtype='f8')
    }

def add_indicators(inputs):
    # Overlap Studies
    sma5 = SMA(inputs, timeperiod=5)
    sma10 = SMA(inputs, timeperiod=10)
    ema5 = EMA(inputs, timeperiod=5)
    ema10 = EMA(inputs, timeperiod=10)

    # Momentum Indicators
    rsi = RSI(inputs, timeperiod=14)
    mfi = MFI(inputs, timeperiod=14)
    adx = ADX(inputs, timeperiod=14)
    willr = WILLR(inputs, timeperiod=14)
    ultosc = ULTOSC(inputs, timeperiod1=7, timeperiod2=14, timeperiod3=28)
    aroondown, aroonup = AROON(inputs, timeperiod=14)
    aroonosc = AROONOSC(inputs, timeperiod=14)
    cmo = CMO(inputs, timeperiod=14)
    macd, macdsignal, macdhist = MACD(inputs, fastperiod=12, slowperiod=26, signalperiod=9)
    slowk, slowd = STOCH(inputs, fastk_period=5, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0)

    # Volume Indicators
    obv = OBV(inputs)

    # Volatility Indicators
    atr = ATR(inputs, timeperiod=14)
    natr = NATR(inputs, timeperiod=14)
    trange = TRANGE(inputs)

    # a = np.column_stack((sma5, sma10, ema5, ema10, rsi, mfi, adx, willr, ultosc, aroondown, aroonup, aroonosc, cmo, macd, macdsignal, macdhist, slowk, slowd, obv, atr, natr, trange))
    a = np.column_stack((sma5, sma10, ema5, ema10, atr))

    return a

def create_data(file_name):
    data = get_data(file_name)
    inputs = format_data(data)

    x = add_indicators(inputs)
    y = inputs['close']

    x = x[~np.isnan(x).any(axis=1)]

    rows_difference = y.shape[0] - x.shape[0]
    y = y[rows_difference:]

    return {'x': x, 'y': y}

def train_model(training_data):
    clf = svm.SVR()
    clf.fit(training_data['x'], training_data['y'])
    return clf

def predict_data(clf, test_data):
    print(test_data['x'][0])
    y = clf.predict(test_data['x'][0])
    print(y, test_data['y'][0])

training_data = create_data('aapl-2015.json')
test_data = create_data('aapl-2016.json')

# print(training_data['x'][:1], '\n', test_data['x'][:1])
# print(training_data['x'])

clf = train_model(training_data)
predict_data(clf, training_data)
