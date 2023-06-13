# https://www.acmicpc.net/problem/2293

N, K = map(int, input().split())
data = []

for i in range(N):
    data.append(int(input()))

result = [0] * (K + 1)
result[0] = 1
for coin in data:
    for j in range(coin, K + 1):
        result[j] += result[j - coin]

print(result.pop())