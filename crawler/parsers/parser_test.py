import articles
import requests
from bs4 import BeautifulSoup as bs
from urlparse import urlparse

url = 'http://www.bloomberg.com/news/articles/2016-08-27/icahn-mocks-ackman-s-obsession-after-raising-herbalife-stake'
result = requests.get(url)
o = urlparse(url)
# soup = bs(result, 'html.parser')

# print(o.hostname)
# print(result)

data = articles.parser_switcher(o.hostname, result.text)
print(data)
