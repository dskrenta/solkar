import json
import numpy as np
from talib.abstract import *
from sklearn.svm import SVC

# Define constants
PERIOD = 1
OVERLAP_STUDIES = [
    'BBANDS',               # Bollinger Bands
    'DEMA',                 # Double Exponential Moving Average
    'EMA',                  # Exponential Moving Average
    'HT_TRENDLINE',         # Hilbert Transform - Instantaneous Trendline
    'KAMA',                 # Kaufman Adaptive Moving Average
    'MA',                   # Moving average
    'MAMA',                 # MESA Adaptive Moving Average
    'MAVP',                 # Moving average with variable period
    'MIDPOINT',             # MidPoint over period
    'MIDPRICE',             # Midpoint Price over period
    'SAR',                  # Parabolic SAR
    'SAREXT',               # Parabolic SAR - Extended
    'SMA',                  # Simple Moving Average
    'T3',                   # Triple Exponential Moving Average (T3)
    'TEMA',                 # Triple Exponential Moving Average
    'TRIMA',                # Triangular Moving Average
    'WMA',                  # Weighted Moving Average
]
MOMENTUM_INDICATORS = [
    'ADX',                  # Average Directional Movement Index
    'ADXR',                 # Average Directional Movement Index Rating
    'APO',                  # Absolute Price Oscillator
    'AROON',                # Aroon
    'AROONOSC',             # Aroon Oscillator
    'BOP',                  # Balance Of Power
    'CCI',                  # Commodity Channel Index
    'CMO',                  # Chande Momentum Oscillator
    'DX',                   # Directional Movement Index
    'MACD',                 # Moving Average Convergence/Divergence
    'MACDEXT',              # MACD with controllable MA type
    'MACDFIX',              # Moving Average Convergence/Divergence Fix 12/26
    'MFI',                  # Money Flow Index
    'MINUS_DI',             # Minus Directional Indicator
    'MINUS_DM',             # Minus Directional Movement
    'MOM',                  # Momentum
    'PLUS_DI',              # Plus Directional Indicator
    'PLUS_DM',              # Plus Directional Movement
    'PPO',                  # Percentage Price Oscillator
    'ROC',                  # Rate of change : ((price/prevPrice)-1)*100
    'ROCP',                 # Rate of change Percentage: (price-prevPrice)/prevPrice
    'ROCR',                 # Rate of change ratio: (price/prevPrice)
    'ROCR100',              # Rate of change ratio 100 scale: (price/prevPrice)*100
    'RSI',                  # Relative Strength Index
    'STOCH',                # Stochastic
    'STOCHF',               # Stochastic Fast
    'STOCHRSI',             # Stochastic Relative Strength Index
    'TRIX',                 # 1-day Rate-Of-Change (ROC) of a Triple Smooth EMA
    'ULTOSC',               # Ultimate Oscillator
    'WILLR',                # Williams' %R
]
VOLUME_INDICATORS = [
    'AD',                   # Chaikin A/D Line
    'ADOSC',                # Chaikin A/D Oscillator
    'OBV',                  # On Balance Volume
]
VOLATILITY_INDICATORS = [
    'ATR',                  # Average True Range
    'NATR',                 # Normalized Average True Range
    'TRANGE',               # True Range
]
PRICE_TRANSFORM = [
    'AVGPRICE',             # Average Price
    'MEDPRICE',             # Median Price
    'TYPPRICE',             # Typical Price
    'WCLPRICE',             # Weighted Close Price
    'HT_DCPERIOD',          # Hilbert Transform - Dominant Cycle Period
    'HT_DCPHASE',           # Hilbert Transform - Dominant Cycle Phase
    'HT_PHASOR',            # Hilbert Transform - Phasor Components
    'HT_SINE',              # Hilbert Transform - SineWave
    'HT_TRENDMODE',         # Hilbert Transform - Trend vs Cycle Mode
]
STATISTIC_FUNCTIONS = [
    'BETA',                 # Beta
    'CORREL',               # Pearson's Correlation Coefficient (r)
    'LINEARREG',            # Linear Regression
    'LINEARREG_ANGLE',      # Linear Regression Angle
    'LINEARREG_INTERCEPT',  # Linear Regression Intercept
    'LINEARREG_SLOPE',      # Linear Regression Slope
    'STDDEV',               # Standard Deviation
    'TSF',                  # Time Series Forecast
    'VAR',                  # Variance
]

# Talib timeperiod configuration
# SMA.parameters = {'timeperiod': 15}

# Numpy print configuration
np.set_printoptions(threshold=np.inf)

def get_data(file_name):
    data_file = open(file_name, encoding='utf-8')
    data = json.loads(data_file.read())
    return data

def format_data(data, type, adj_ratio):
    if type != 'volume':
        return list(map(lambda d: d[type] * adj_ratio, data))
    else:
        return list(map(lambda d: d[type] / adj_ratio, data))

def generate_inputs(data):
    adj_ratio = int(data[0]['adjClose']) / int(data[0]['close'])
    return {
        'open': np.array(format_data(data, 'open', adj_ratio), dtype='f8'),
        'high': np.array(format_data(data, 'high', adj_ratio), dtype='f8'),
        'low': np.array(format_data(data, 'low', adj_ratio), dtype='f8'),
        'close': np.array(format_data(data, 'adjClose', adj_ratio), dtype='f8'),
        'volume': np.array(format_data(data, 'volume', adj_ratio), dtype='f8')
    }

def add_indicators(inputs):
    # Overlap Studies
    sma5 = SMA(inputs)
    sma10 = SMA(inputs)
    ema5 = EMA(inputs)
    ema10 = EMA(inputs)
    upperband, middleband, lowerband = BBANDS(inputs)
    dema = DEMA(inputs)
    ht_trendline = HT_TRENDLINE(inputs)
    kama = KAMA(inputs)
    wma = WMA(inputs)

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

    '''
    ta_list = []

    ta_list.append(BBANDS(inputs, timeperiod=14))
    ta_list.append(DEMA(inputs, timeperiod=14))
    ta_list.append(EMA(inputs, timeperiod=14))
    ta_list.append(HT_TRENDLINE(inputs, timeperiod=14))
    ta_list.append(KAMA(inputs, timeperiod=14))
    ta_list.append(MA(inputs, timeperiod=14))
    ta_list.append(MAMA(inputs, timeperiod=14))
    ta_list.append(MAVP(inputs, timeperiod=14))
    ta_list.append(MIDPOINT(inputs, timeperiod=14))
    ta_list.append(MIDPRICE(inputs, timeperiod=14))
    ta_list.append(SAR(inputs, timeperiod=14))
    ta_list.append(SAREXT(inputs, timeperiod=14))
    ta_list.append(SMA(inputs, timeperiod=14))
    ta_list.append(T3(inputs, timeperiod=14))
    ta_list.append(TEMA(inputs, timeperiod=14))
    ta_list.append(TRIMA(inputs, timeperiod=14))
    ta_list.append(WMA(inputs, timeperiod=14))
    '''

    '''
    ta_list = []
    for indicator in OVERLAP_STUDIES:
        func = Function(indicator)
        output = func(inputs)
        ta_list.append(output)
        # print(func.parameters)
    '''

    # a = np.column_stack((sma10, ema10, rsi, mfi, adx, atr, natr))
    a = np.column_stack((ema10, ema10, rsi, upperband, middleband, lowerband, dema, kama, ht_trendline, wma))
    # a = np.column_stack(ta_list)
    return a

def add_labels(closes, period=1):
    labels = []
    for i in range(len(closes)):
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
