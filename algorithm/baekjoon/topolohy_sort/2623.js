// https://www.acmicpc.net/problem/2623
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 3
3 1 4 3
3 1 3 4
2 2 3`;
const [NM, ...data] = input.split('\n');
const [N, M] = NM.split(' ').map(Number);
console.log(solution(N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  const result = [];
  const inDegree = Array(N + 1).fill(0);
  const graph = Array.from({length: N + 1}, () => new Set());

  data.forEach(e => {
    for(let i = 1; i < e.length - 1; i++) {
      if(graph[e[i]].has(e[i + 1])) continue;
      inDegree[e[i + 1]]++;
      graph[e[i]].add(e[i + 1]);
    }
  })

  const topologySort = () => {
    let queue = [];

    for(let i = 1; i <= N; i++) {
      if(inDegree[i] === 0) {
        queue.push(i);
      }
    }

    while(queue.length) {
      const nextQueue = [];
      const size = queue.length;

      for(let i = 0; i < size; i++) {
        const node = queue[i];
        result.push(node);
        graph[node].forEach((next) => {
          inDegree[next]--;
          if(inDegree[next] === 0) nextQueue.push(next);
        })
      }
      queue = nextQueue;
    }
  }
  topologySort();

  return result.length === N ? result.join('\n') : 0;
}