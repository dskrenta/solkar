from bs4 import BeautifulSoup as bs
import hashlib
from vaderSentiment.vaderSentiment import sentiment as vaderSentiment
from datetime import datetime

def parser_switcher(host, page):
    parsers = {
        'www.bloomberg.com': bloomberg_parse,
        'www.wsj.com': wsj_parse,
        'www.nytimes.com': nytimes_parse
    }
    func = parsers.get(host)
    return func(page)

def html_hash(page):
    return hashlib.md5(page.encode('utf-8')).hexdigest()

def generate_soup(page):
    return bs(page, 'html.parser')

def sentiment(data):
    try:
        return vaderSentiment(data.encode('utf-8'))
    except:
        return 'ERROR'

def parse_datetime(soup):
    return soup.find('time', {'datetime': True})['datetime'] or None

def parse_title(soup):
    return soup.title.getText() or None

def default_parse(page):
    return 0

def bloomberg_parse(page):
    soup = generate_soup(page)
    authors = map(lambda author: author.getText(), soup.find_all('a', {'class': 'author-link'})) or None
    title = parse_title(soup)
    page_datetime = parse_datetime(soup)
    content = 0

    return {
        'title': title,
        'published': page_datetime,
        'authors': authors,
        'content': content,
        'html_hash': html_hash(page),
        'title_sentiment': sentiment(title) if title else sentiment(header),
        'content_sentiment': sentiment(content),
        'crawl_timestamp': datetime.utcnow().isoformat(' ')
    }

def wsj_parse(page):
    return 0

def nytimes_parse(page):
    return 0

# parser_switcher('test_1', 'HELLO!')
# parser_switcher('test_2', 'HELLO!')
