// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const PriorityQueue = require("../util/PriorityQueue");
const input = `5 5 3
1 1 1
2 2 2
3 3 3
4 4 4
5 5 5`;
const [NMK, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(NMK, data));

function solution([N, M, K], data) {
  const graph = Array.from({length: N + 1}, () => ([]));
  const dist = Array.from({length: N + 1}, () => new PriorityQueue((a, b) => a > b));
  for(const [a, b, c] of data) {
    graph[a].push([b, c]);
  }
  const dijkstra = () => {
    const pq = new PriorityQueue((a, b) => a[1] < b[1]);
    pq.push([1, 0]);
    dist[1].push(0);
    while(!pq.empty()) {
      const [node, d1] = pq.top();
      pq.pop();
      for(const [nextNode, d2] of graph[node]) {
        const nextDist = d1 + d2;
        if(dist[nextNode].heap.length < K) {
          dist[nextNode].push(nextDist);
          pq.push([nextNode, nextDist]);
          continue;
        } 
        if(dist[nextNode].top() > nextDist) {
          dist[nextNode].pop();
          dist[nextNode].push(nextDist);
          pq.push([nextNode, nextDist]);
        }
      }
    }
  }
  dijkstra();
  let result = '';
  for(let i = 1; i <= N; i++) {
    if(dist[i].heap.length !== K) {
      result += '-1\n';
    } else {
      result += `${dist[i].top()}\n`;
    }
  }
  return result.trim();
}