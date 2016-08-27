from bs4 import BeautifulSoup as bs
import hashlib
from vaderSentiment.vaderSentiment import sentiment as vaderSentiment

def parser_switcher(host, page):
    parsers = {
        'bloomberg.com': bloomberg_parse,
        'wsj.com': wsj_parse,
        'nytimes.com': nytimes_parse
    }
    func = parsers.get(host)
    return func(page)

def html_hash(page):
    return hashlib.md5(page).hexdigest()

def generate_soup(page):
    return bs(page, 'html.parser')

def sentiment(data):
    try:
        return vaderSentiment(data)
    except:
        return None

def parse_datetime(soup):
    return soup.find('time', {'datetime': True})['datetime'] or None

def parse_title(soup):
    return soup.title or None

def parse_heading(soup):
    return soup.find('h1').getText() or None

def default_parse(page):
    return 0

def bloomberg_parse(page):
    soup = generate_soup(page)
    authors = map(lambda author: author.getText(), soup.find_all('div', {'class': 'author-byline'})) or None
    title = parse_title(soup)
    header = parse_header(soup)
    datetime = parse_datetime(soup)
    content = 0

    return {
        'title': title,
        'published': datetime,
        'header': header,
        'authors': authors,
        'content': content,
        'html_has': html_hash(page),
        'title_sentiment': sentiment(title) if title else sentiment(header)
        'content_sentiment': sentiment(content)
    }

def wsj_parse(page):
    return 0

def nytimes_parse(page):
    return 0

# parser_switcher('test_1', 'HELLO!')
# parser_switcher('test_2', 'HELLO!')
