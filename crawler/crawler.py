from BeautifulSoup import BeautifulSoup as bs
import requests
from Queue import Queue
from threading import Thread

class WebCrawler:
    def __init__(self, rootURL):
        self.q = Queue()
        self.visited = set()
        self.threads = []
        self.num_worker_threads = 2
        self.q.put(rootURL)
        self.start_crawl()

    def crawl_worker(self):
        while True:
            url = self.q.get()
            if url is None:
                break
            self.crawl_task(url)
            self.q.task_done()

    def crawl_task(self, url):
        print(url)
        result = requests.get(url)
        soup = bs(result.text)
        self.visited.add(url)
        print(self.visited)
        for link in soup.findAll('a'):
            href = None
            try:
                href = link['href']
            except KeyError:
                pass
            if href != None and (href.startswith('http://') or href.startswith('https://') and href not in self.visited):
                self.q.put(href)

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
