import articleparse
import requests
import json
# from bs4 import BeautifulSoup as bs
# from urlparse import urlparse

url = 'http://www.bloomberg.com/news/articles/2016-08-27/icahn-mocks-ackman-s-obsession-after-raising-herbalife-stake'
result = requests.get(url)
# o = urlparse(url)

# print result

print json.dumps(articleparse.article_parse(url, result.text), sort_keys=True, indent=4, separators=(',', ': '))

# print articleparse.article_parse(url, result.text)
