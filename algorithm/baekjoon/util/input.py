import sys
str = sys.stdin.readline().rstrip()
n, m, k = map(int, sys.stdin.readline().split())
uvcs = [list(map(int, sys.stdin.readline().split())) for _ in range(m)]