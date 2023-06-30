// https://www.acmicpc.net/problem/2056
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
5 0
1 0
3 0
6 0
1 0
8 0
4 0`;
const [N, ...data] = input.split('\n');
console.log(solution(+N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  let result = 0;
  const inDegree = Array(N + 1).fill(0);
  const graph = Array.from({length: N + 1}, () => []);
  const dp = Array(N + 1).fill(0);

  for(let i = 0; i < data.length; i++) {
    dp[i + 1] = data[i][0];
    result = Math.max(result, dp[i + 1]);
    for(let j = 2; j < data[i].length; j++) {
      inDegree[i + 1]++;
      graph[data[i][j]].push(i + 1);
    }
  }

  const topologySort = () => {
    let queue = [];

    for(let i = 1; i <= N; i++) {
      if(inDegree[i] === 0) {
        queue.push(i);
      }
    }

    while(queue.length > 0) {
      const nextQueue = [];
      const size = queue.length;
      for(let i = 0; i < size; i++) {
        const node = queue[i];
        for(const next of graph[node]) {
          inDegree[next]--;
          dp[next] = Math.max(dp[next], dp[node] + data[next - 1][0]);
          result = Math.max(result, dp[next]);
          if(inDegree[next] === 0) nextQueue.push(next);
        }
      }

      queue = nextQueue;
    }
  }

  topologySort();

  return result;
}