import numpy as np
from talib.abstract import *
from yahoo_finance import Share
from datetime import datetime, timedelta

PATTERNS = [
    '2CROWS',            # Two Crows
    '3BLACKCROWS',       # Three Black Crows
    '3INSIDE',           # Three Inside Up/Down
    '3LINESTRIKE',       # Three-Line Strike
    '3OUTSIDE',          # Three Outside Up/Down
    '3STARSINSOUTH',     # Three Stars In The South
    '3WHITESOLDIERS',    # Three Advancing White Soldiers
    'ABANDONEDBABY',     # Abandoned Baby
    'ADVANCEBLOCK',      # Advance Block
    'BELTHOLD',          # Belt-hold
    'BREAKAWAY',         # Breakaway
    'CLOSINGMARUBOZU',   # Closing Marubozu
    'CONCEALBABYSWALL',  # Concealing Baby Swallow
    'COUNTERATTACK',     # Counterattack
    'DARKCLOUDCOVER',    # Dark Cloud Cover
    'DOJI',              # Doji
    'DOJISTAR',          # Doji Star
    'DRAGONFLYDOJI',     # Dragonfly Doji
    'ENGULFING',         # Engulfing Pattern
    'EVENINGDOJISTAR',   # Evening Doji Star
    'EVENINGSTAR',       # Evening Star
    'GAPSIDESIDEWHITE',  # Up/Down-gap side-by-side white lines
    'GRAVESTONEDOJI',    # Gravestone Doji
    'HAMMER',            # Hammer
    'HANGINGMAN',        # Hanging Man
    'HARAMI',            # Harami Pattern
    'HARAMICROSS',       # Harami Cross Pattern
    'HIGHWAVE',          # High-Wave Candle
    'HIKKAKE',           # Hikkake Pattern
    'HIKKAKEMOD',        # Modified Hikkake Pattern
    'HOMINGPIGEON',      # Homing Pigeon
    'IDENTICAL3CROWS',   # Identical Three Crows
    'INNECK',            # In-Neck Pattern
    'INVERTEDHAMMER',    # Inverted Hammer
    'KICKING',           # Kicking
    'KICKINGBYLENGTH',   # Kicking - bull/bear determined by the longer marubozu
    'LADDERBOTTOM',      # Ladder Bottom
    'LONGLEGGEDDOJI',    # Long Legged Doji
    'LONGLINE',          # Long Line Candle
    'MARUBOZU',          # Marubozu
    'MATCHINGLOW',       # Matching Low
    'MATHOLD',           # Mat Hold
    'MORNINGDOJISTAR',   # Morning Doji Star
    'MORNINGSTAR',       # Morning Star
    'ONNECK',            # On-Neck Pattern
    'PIERCING',          # Piercing Pattern
    'RICKSHAWMAN',       # Rickshaw Man
    'RISEFALL3METHODS',  # Rising/Falling Three Methods
    'SEPARATINGLINES',   # Separating Lines
    'SHOOTINGSTAR',      # Shooting Star
    'SHORTLINE',         # Short Line Candle
    'SPINNINGTOP',       # Spinning Top
    'STALLEDPATTERN',    # Stalled Pattern
    'STICKSANDWICH',     # Stick Sandwich
    'TAKURI',            # Takuri (Dragonfly Doji with very long lower shadow)
    'TASUKIGAP',         # Tasuki Gap
    'THRUSTING',         # Thrusting Pattern
    'TRISTAR',           # Tristar Pattern
    'UNIQUE3RIVER',      # Unique 3 River
    'UPSIDEGAP2CROWS',   # Upside Gap Two Crows
    'XSIDEGAP3METHODS'   # Upside/Downside Gap Three Methods
]
PERIOD = 20

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
    for pattern in PATTERNS:
        func = Function('CDL' + pattern)
        print(np.any(func(inputs)))

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
    data = get_data('AAPL', PERIOD)

main()
