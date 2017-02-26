import numpy as np
from talib.abstract import *
from yahoo_finance import Share
from datetime import datetime, timedelta

def get_data(symbol, period):
    dates = format_date(period)
    equity = Share(symbol)
    data = equity.get_historical(dates['start'], dates['end'])
    inputs = generate_inputs(data)
    print(identify_known_patterns(inputs))
    return data

def format_data(data, type):
    return list(map(lambda d: d[type], data))

def generate_inputs(data):
    return {
        'open': np.array(format_data(data, 'Open'), dtype='f8'),
        'high': np.array(format_data(data, 'High'), dtype='f8'),
        'low': np.array(format_data(data, 'Low'), dtype='f8'),
        'close': np.array(format_data(data, 'Close'), dtype='f8'),
        'volume': np.array(format_data(data, 'Volume'), dtype='f8')
    }

def identify_known_patterns(inputs):
    return {
        '2crows': CDL2CROWS(inputs) / 100,
        '3blackcrows': CDL3BLACKCROWS(inputs) / 100,
        '3inside': CDL3INSIDE(inputs) / 100,
        '3linestrike': CDL3LINESTRIKE(inputs) / 100,
        '3outside': CDL3OUTSIDE(inputs) / 100,
        '3starsinsouth': CDL3STARSINSOUTH(inputs) / 100,
        '3whitesoldiers': CDL3WHITESOLDIERS(inputs) / 100,
        'abandonedbaby': CDLABANDONEDBABY(inputs) / 100,
        'advanceblock': CDLADVANCEBLOCK(inputs) / 100,
        'belthold': CDLBELTHOLD(inputs) / 100,
        'breakaway': CDLBREAKAWAY(inputs) / 100,
        'closingmarubozu': CDLCLOSINGMARUBOZU(inputs) / 100,
        'concealbabyswall': CDLCONCEALBABYSWALL(inputs) / 100
    }

def format_date(period):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=period)
    end_format = str(end_date.year) + "-" + str(end_date.month) + "-" + str(end_date.day)
    start_format = str(start_date.year) + "-" + str(start_date.month) + "-" + str(start_date.day)
    return {
        'start': start_format,
        'end': end_format
    }

def main():
    data = get_data('AAPL', 20)

main()
