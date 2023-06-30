// https://www.acmicpc.net/problem/1005
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1
10 5
1 2 3 4 5 6 7 8 9 10
1 6
2 7
3 8
4 9
5 10
6`;
const [T, ...data] = input.split('\n');
const result = [];
let t = 0;
let k = 0;
while(T > t++) {
  const [N, K] = data[k++].split(' ').map(Number);
  const Ds = data[k++].split(' ').map(Number);
  const XYs = data.slice(k, k + K).map(e => e.split(' ').map(Number));
  k += K;
  const W = +data[k++];
  result.push(solution(N, Ds, XYs, W));
}
console.log(result.join('\n'));

function solution (N, Ds, XYs, W) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = Array(N + 1).fill(0);
  const dp = Array(N + 1).fill(0);

  for(const [x, y] of XYs) {
    graph[x].push(y);
    inDegree[y]++;
  }

  const topologySort = () => {
    let queue = [];

    for(let i = 1; i <= N; i++) {
      if(inDegree[i] === 0) {
        queue.push(i);
      }
      dp[i] = Ds[i - 1]
    }

    while(queue.length > 0) {
      const nextQueue = [];
      const size = queue.length;
      for(let i = 0; i < size; i++) {
        const node = queue[i];
        
        for(const next of graph[node]) {
          inDegree[next]--;
          dp[next] = Math.max(dp[next], dp[node] + Ds[next - 1]);
          if(inDegree[next] === 0) nextQueue.push(next);
        }
      }
      
      queue = nextQueue;
    }
  }

  topologySort();
  
  return dp[W];
}