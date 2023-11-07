# https://www.acmicpc.net/problem/17835
import sys
import heapq

n, m, k = map(int, sys.stdin.readline().split())
uvc = [list(map(int, sys.stdin.readline().split())) for _ in range(m)]
ic = map(int, sys.stdin.readline().split())

graph = [[] for _ in range(n + 1)]

for u, v, c in uvc:
  graph[v].append([u, c])

dist = [sys.maxsize] * (n + 1)

def dijkstra():
  pq = []
  for idx in ic:
    heapq.heappush(pq, [0, idx])
    dist[idx] = 0
  while pq:
    dist1, node = heapq.heappop(pq)
    if(dist[node] < dist1): 
      continue
    for nextNode, dist2 in graph[node]:
      if dist1 + dist2 < dist[nextNode]:
        dist[nextNode] = dist1 + dist2
        heapq.heappush(pq, [dist1 + dist2, nextNode])

dijkstra()

result1 = 0
result2 = 0

for i in range(1, n + 1):
  if result2 < dist[i]:
    result1 = i
    result2 = dist[i]

print(result1)
print(result2)
