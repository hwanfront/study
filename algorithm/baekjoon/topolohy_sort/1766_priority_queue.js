const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/1766
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 3
4 1
3 1
5 3`;
const [NM, ...data] = input.split('\n');
const [N, M] = NM.split(' ').map(Number);
console.log(solution(N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  const result = [];
  const graph = Array.from({length: N + 1}, () => []);
  const inDegree = Array(N + 1).fill(0);
  
  for(let i = 0; i < data.length; i++) {
    const [x, y] = data[i];
    graph[x].push(y);
    inDegree[y]++;
  }

  const topologySort = () => {
    let pq = new PriorityQueue((a, b) => a < b);

    for(let i = 1; i <= N; i++) {
      if(inDegree[i] === 0) {
        pq.push(i);
      }
    }

    while(!pq.empty()) {
      const node = pq.top();
      result.push(node);
      pq.pop();
      for(const next of graph[node]) {
        inDegree[next]--;
        if(inDegree[next] === 0) pq.push(next);
      }
    }
  }

  topologySort();

  return result.join(' ');
}