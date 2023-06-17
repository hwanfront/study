// https://www.acmicpc.net/problem/1707
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5
3 2
1 3
2 3
4 4
1 2
2 3
3 4
4 2
2 1
1 2
5 4
1 2
1 3
1 4
4 5
5 5
1 2
1 3
1 4
4 5
1 5`;
const [K, ...data] = input.split('\n');
const result = [];
let cnt = 0;

for(let i = 0; i < K; i++) {
  const [V, E] = data[i + cnt].split(' ').map(Number);
  result.push(solution(V, data.slice(i + cnt + 1, i + cnt + E + 1).map((e) => e.split(' ').map(Number))));
  cnt += E;
}

console.log(result.join('\n'));

function solution (V, edges) {
  const map = new Map(Array.from({ length: V }, (_, i) => ([i + 1, []])));
  const visited = Array(V + 1).fill(0);
  
  for(const [u, v] of edges) {
    map.get(u).push(v);
    map.get(v).push(u);
  }

  const bfs = () => {
    for(let i = 1; i <= V; i++) {
      if(visited[i] !== 0) continue;
      visited[i] = 1;
      let queue = [i];
      while(queue.length > 0) {
        const size = queue.length;
        const nextQueue = [];
        for(let j = 0; j < size; j++) {
          const edge = queue[j];
          const nextEdges = map.get(edge);
          for(const nextEdge of nextEdges) {
            if(visited[nextEdge] === 0) {
              visited[nextEdge] = -visited[edge];
              nextQueue.push(nextEdge);
            }
            if(visited[nextEdge] === visited[edge]) return "NO";
          }
        }
        queue = nextQueue;
      }
    }
    return 'YES';
  }

  return bfs();
}