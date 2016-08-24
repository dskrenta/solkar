from BeautifulSoup import BeautifulSoup as bs
import requests
from Queue import Queue
from threading import Thread
from urlparse import urlparse

class WebCrawler:
    def __init__(self, root_urls):
        self.q = Queue()
        self.visited = set()
        self.threads = []
        self.num_worker_threads = 2
        self.host_whitelist = []
        self.load_host_whitelist()
        for url in root_urls:
            self.q.put(url)
        self.start_crawl()

    def load_host_whitelist(self):
        f = open('host_whitelist.txt', 'r')
        self.host_whitelist = map(lambda line: line.strip(), f.readlines())
        print(self.host_whitelist)

    def crawl_worker(self):
        while True:
            url = self.q.get()
            if url is None:
                break
            self.crawl_task(url)
            self.q.task_done()

    def crawl_task(self, url):
        if url not in self.visited:
            print(url)
            result = requests.get(url)
            soup = bs(result.text)
            self.visited.add(url)
            for link in soup.findAll('a'):
                href = None
                try:
                    href = link['href']
                except KeyError:
                    pass
                if href != None and (href.startswith('http://') or href.startswith('https://') and href not in self.visited):
                    self.q.put(href)

    def normalize_url(self, url):
        return 0

    def check_host(self, url):
        url_p = urlparse(url)
        host = re.sub('/^WWW\./', '', url_p.hostname())
        if host in self.host_whitelist:
            return True
        return False

    def parse_page(self, soup):
        return 0

    def start_crawl(self):
        for i in range(self.num_worker_threads):
            t = Thread(target=self.crawl_worker)
            t.start()
            self.threads.append(t)
        self.q.join()
        self.end_crawl()

    def end_crawl(self):
        for i in range(self.num_worker_threads):
            self.q.put(None)
        for t in self.threads:
            t.join()
