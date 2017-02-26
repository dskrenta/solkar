import json
import numpy as np
from talib.abstract import *
from sklearn.svm import SVC

PERIOD = 1

np.set_printoptions(threshold=np.inf)

def get_data(file_name):
    data_file = open(file_name, encoding='utf-8')
    data = json.loads(data_file.read())
    return data

def format_data(data, type):
    return list(map(lambda d: d[type], data))

def generate_inputs(data):
    return {
        'open': np.array(format_data(data, 'open'), dtype='f8'),
        'high': np.array(format_data(data, 'high'), dtype='f8'),
        'low': np.array(format_data(data, 'low'), dtype='f8'),
        'close': np.array(format_data(data, 'adjClose'), dtype='f8'),
        'volume': np.array(format_data(data, 'volume'), dtype='f8')
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

    a = np.column_stack((sma10, ema10, rsi, mfi, adx, atr, natr))
    return a

def add_labels(closes, period=1):
    labels = []
    for i in range(len(closes)):
        #if i != 0:
        if i-period >= 0:
            label = closes[i] >= closes[i-period]
            if label:
                labels.append(1)
            else:
                labels.append(0)
    return np.array(labels)

def create_data(file_name):
    data = get_data(file_name)
    inputs = generate_inputs(data)
    x = add_indicators(inputs)
    x = x[~np.isnan(x).any(axis=1)]
    y = inputs['close']
    rows_difference = y.shape[0] - x.shape[0]
    y = y[rows_difference:]
    y = add_labels(y, PERIOD)
    x = x[PERIOD:]

    return {
        'x': x,
        'y': y
    }

def train_model(training_data):
    clf = SVC()
    clf.fit(training_data['x'], training_data['y'])
    return clf

def predict_data(clf, test_data):
    output = clf.predict(test_data['x'])
    return output

def main():
    training_data = create_data('aapl-historical-2000-2014.json')
    test_data = create_data('aapl-2010-2014.json')
    clf = train_model(training_data)
    output = predict_data(clf, test_data)
    print('Predicted:')
    print(output)
    print('Actual:')
    print(test_data['y'])
    print('Score:')
    print(clf.score(test_data['x'], test_data['y']) * 100)

main()
