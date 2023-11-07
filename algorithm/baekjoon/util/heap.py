import heapq

pq = []

heapq.heappush(pq, [2, "b"])
heapq.heappush(pq, [1, "a"])
heapq.heappush(pq, [3, "c"])

while pq:
  print(*heapq.heappop(pq))