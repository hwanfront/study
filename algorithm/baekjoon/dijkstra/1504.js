const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/1504
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4 6
1 2 3
2 3 3
3 4 1
1 3 5
2 4 5
1 4 4
2 3`;
const [NE, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, E] = NE;
const [v1, v2] = data.pop();

console.log(solution(N, v1, v2, data));

function solution(N, v1, v2, data) {
  const graph = new Map();
  for(let i = 0; i <= N; i++) {
    graph.set(i, []);
  }
  data.forEach(([a, b, c]) => {
    graph.get(a).push([b, c]);
    graph.get(b).push([a, c]);
  })

  const dijkstra = (start) => {
    const dist = Array(N + 1).fill(Infinity);
    const pq = new PriorityQueue((a, b) => a.dist < b.dist);
    dist[start] = 0;
    pq.push({ dist: 0, node: start });
    while(!pq.empty()) {
      const { dist: curDist, node: curNode } = pq.top();
      pq.pop();
      for(let i = 0; i < graph.get(curNode).length; i++) { // 
        const [nextNode, d] = graph.get(curNode)[i];
        const nextDist = d + curDist;
        if(nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          pq.push({ dist: nextDist, node: nextNode });
        }
      }
    }
    return dist;
  }

  const firstTo = dijkstra(1);
  const v1To = dijkstra(v1);
  const v2To = dijkstra(v2);
  const fv1v2N = firstTo[v1] + v1To[v2] + v2To[N];
  const fv2v1N = firstTo[v2] + v2To[v1] + v1To[N];
  if(fv1v2N === Infinity && fv2v1N === Infinity) {
    return -1;
  }
  return Math.min(fv2v1N, fv1v2N);
}

// !!주의
// map을 생산할 때 주어진 간선에 대해서만 생성을 했을 때
// 조건에서의 반드시 들러야하는 두 정점에 접근해야하는 경우
// undefiend에서 length를 찾게 되어 reference error 발생
function solution1(N, v1, v2, data) { // 주의
  const graph = new Map(); 
  data.forEach(([a, b, c]) => {
    if(!graph.has(a)) {
      graph.set(a, []);
    }
    if(!graph.has(b)) {      
      graph.set(b, []);
    }
    graph.get(a).push([b, c]);
    graph.get(b).push([a, c]);
  })

  const dijkstra = (start) => {
    const dist = Array(N + 1).fill(Infinity);
    const pq = new PriorityQueue((a, b) => a.dist > b.dist);
    dist[start] = 0;
    pq.push({ dist: 0, node: start });
    while(!pq.empty()) {
      const { dist: curDist, node: curNode } = pq.top();
      pq.pop();
      if(dist[curNode] < curDist) continue;
      for(let i = 0; i < graph.get(curNode).length; i++) {
        const [nextNode, d] = graph.get(curNode)[i];
        const nextDist = d + curDist;
        if(nextDist < dist[nextNode]) {
          dist[nextNode] = nextDist;
          pq.push({ dist: nextDist, node: nextNode });
        }
      }
    }
    return dist;
  }

  const firstTo = dijkstra(1);
  const v1To = dijkstra(v1);
  const v2To = dijkstra(v2);
  const fv1v2N = firstTo[v1] + v1To[v2] + v2To[N];
  const fv2v1N = firstTo[v2] + v2To[v1] + v1To[N];
  if(fv1v2N === Infinity && fv2v1N === Infinity) {
    return -1;
  }
  return res;
}