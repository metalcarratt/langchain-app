import time

def start():
    start_time = time.time()
    return lambda title: print(f"{title}: {time.time() - start_time: .1f}s")
