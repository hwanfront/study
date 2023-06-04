// https://www.acmicpc.net/problem/4485
const PriorityQueue = require('../util/PriorityQueue');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
const check = (x, y, N, M) => 0 <= x && x < N && 0 <= y && y < M;

let N = null;
let cave = [];
const result = [];

const dijkstra = () => {
  const pq = new PriorityQueue((a, b) => a[0] < b[0]);
  const visited = [];
  for(let i = 0; i < cave.length; i++) {
    visited.push(Array(cave[0].length).fill(false));
  }
  visited[0][0] = true;
  pq.push([cave[0][0], [0, 0]]);

  while(!pq.empty()) {
    const [cost, [x, y]] = pq.top();
    pq.pop();
    if(x === cave.length - 1 && y === cave[0].length - 1) return cost;
    for(const [dx, dy] of direction) {
      const nx = dx + x;
      const ny = dy + y;
      if(!check(nx, ny, cave.length, cave[0].length)) continue;
      if(visited[nx][ny]) continue;
      visited[nx][ny] = true;
      const nextCost = cave[nx][ny] + cost;
      pq.push([nextCost, [nx, ny]]);
    }
  }
}

rl.on('line', (line) => {
  if(line === '0') {
    rl.close();
  }
  if(N === null) {
    cave = [];
    N = +line;
    return;
  }
  if(--N === 0) {
    cave.push(line.split(' ').map(Number));
    N = null;
    result.push(dijkstra());
    return;
  }
  cave.push(line.split(' ').map(Number));
}).on('close', () => {
  console.log(result.map((e, i) => `Problem ${i + 1}: ${e}`).join('\n'));
  process.exit();
})
