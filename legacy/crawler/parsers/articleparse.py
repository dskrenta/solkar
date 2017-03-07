from bs4 import BeautifulSoup as bs
import hashlib
from vaderSentiment.vaderSentiment import sentiment as vaderSentiment
from datetime import datetime
from urlparse import urlparse

def article_parse(url, page):
    parsed_url = urlparse(url)
    soup = bs(page, 'lxml')
    content = parse_content(soup)
    title = parse_title(soup)

    print parsed_url

    return {
        'content': content,
        #'domain': parsed_url.hostname(),
        'authors': parse_authors(soup),
        'url': url,
        'title': title,
        'date_published': parse_date_published(soup),
        'date_crawled': datetime.utcnow().isoformat(' '),
        'article_image': get_meta_tag(soup, 'og:image'),
        'word_count': get_wordcount(),
        'page_hash': generate_page_hash(page),
        'stock_symbols': parse_stock_symbols(soup),
        'title_sentiment': sentiment(title),
        'content_sentiment': sentiment(content)
    }

def get_main_content_div(soup):
    div_list = []

    for tag in soup.find_all('div'):
        num_p = 0
        for child in tag.children:
            if child.name == 'p':
                num_p += 1
        div_list.append(num_p)

    return div_list.index(max(div_list))

def get_meta_tag(soup, name):
    return soup.find('meta', {'property': name})['content'] or None

def parse_content(soup):
    content = ''
    max_index = get_main_content_div(soup)

    for child in soup.find_all('div')[max_index].children:
        if child.name == 'p':
            content += child.getText()

    return content

def parse_authors(soup):
    return 0

def parse_title(soup):
    return soup.title.getText() or None

def parse_date_published(soup):
    return soup.find('time', {'datetime': True})['datetime'] or None

def parse_lead_image(soup):
    return 0

def sentiment(data):
    try:
        return vaderSentiment(data.encode('utf-8'))
    except:
        return None

def parse_stock_symbols(soup):
    return 0

def get_wordcount():
    return 0

def generate_page_hash(page):
    return hashlib.md5(page.encode('utf-8')).hexdigest()
