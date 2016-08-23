from Queue import Queue
from threading import Thread

def worker():
    while True:
        item = q.get()
        if item is None:
            break
        do_work(item)
        q.task_done()

def do_work(item):
    print('%i \n' % (item ** 2))

q = Queue()
threads = []
num_worker_threads = 2

for i in range(num_worker_threads):
    t = Thread(target=worker)
    t.start()
    threads.append(t)

source = [1, 2, 3, 4, 5]

for item in source:
    q.put(item)

# block until all tasks are done
q.join()

# stop workers
for i in range(num_worker_threads):
    q.put(None)
for t in threads:
    t.join()
