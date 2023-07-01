// https://www.acmicpc.net/problem/1948
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `7
9
1 2 4
1 3 2
1 4 3
2 6 3
2 7 5
3 5 1
4 6 4
5 6 2
6 7 5
1 7`;
// const input = `5
// 7
// 1 2 1
// 1 3 3
// 2 3 2
// 2 4 1
// 2 5 3
// 3 5 1
// 4 5 1
// 1 5`;
const [N, M, ...data] = input.split('\n');
console.log(solution(+N, +M, data.map(e => e.split(' ').map(Number))));

function solution (N, M, data) {
  const inDegree = Array(N + 1).fill(0);
  const fgraph = Array.from({length: N + 1}, () => []);
  const bgraph = Array.from({length: N + 1}, () => []);
  const result = Array(N + 1).fill(0);
  let road = 0;

  for(let i = 0; i < M; i++) {
    const [x, y, t] = data[i];
    inDegree[y]++;
    fgraph[x].push([y, t]);
    bgraph[y].push([x, t]);
  }

  const [s, e] = data[M];
  
  const topologySort = () => {
    let queue = [s];
    while(queue.length > 0) {
      const nextQueue = [];
      const size = queue.length;
      for(let i = 0; i < size; i++) {
        const node = queue[i];
        for(const [next, nextTime] of fgraph[node]) {
          inDegree[next]--;
          result[next] = Math.max(result[next], result[node] + nextTime);
          if(inDegree[next] === 0) nextQueue.push(next);
        }
      }
      queue = nextQueue
    }
  }
  
  topologySort();
  
  const visited = Array(N + 1).fill(false);
  let queue = [e];
  visited[e] = true;

  while(queue.length > 0) {
    const nextQueue = [];
    const size = queue.length;
    for(let i = 0; i < size; i++) {
      const node = queue[i];
      for(const [next, nextTime] of bgraph[node]) {
        if(result[node] === result[next] + nextTime) {
          road++;
          if(!visited[next]) {
            nextQueue.push(next);
            visited[next] = true;
          }
        }
      }
    }
    queue = nextQueue;
  }

  return `${result[e]}\n${road}`
}