// https://www.acmicpc.net/problem/12851
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `0 3`;
const [N, K] = input.split(' ').map(Number);
console.log(solution(N, K));

function solution (N, K) {
  const bfs = (start) => {
    const visited = Array(200001).fill(false);
    let queue = [[start, 0]];
    visited[start] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      let cnt = 0;
      let t;
      for(let i = 0; i < size; i++) {
        const [n, time] = queue[i];
        visited[n] = true;
        if(n === K) {
          cnt++;
          t = time;
        }
        if(cnt > 0) continue;
        if(n + 1 <= 100000 && !visited[n + 1]) {
          nextQueue.push([n + 1, time + 1]);
        }
        if(n - 1 >= 0 && !visited[n - 1]) {
          nextQueue.push([n - 1, time + 1]);
        }
        if(n * 2 <= 100000 && !visited[n * 2]) {
          nextQueue.push([n * 2, time + 1]);
        }
      }
      if(cnt > 0) return [t, cnt];
      queue = nextQueue;
    }
  }
  return bfs(N).join('\n');
}