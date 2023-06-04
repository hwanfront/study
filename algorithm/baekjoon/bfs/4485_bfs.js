// https://www.acmicpc.net/problem/4485
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

const bfs = () => {
  const dist = [];
  let queue = [[0, 0]];
  for(let i = 0; i < cave.length; i++) {
    dist.push(Array(cave[0].length).fill(Number.MAX_SAFE_INTEGER));
  }
  dist[0][0] = cave[0][0];

  while(queue.length > 0) {
    const nextQueue = [];
    const size = queue.length;
    for(let i = 0; i < size; i++) {
      const [x, y] = queue[i];
      for(const [dx, dy] of direction) {
        const nx = dx + x;
        const ny = dy + y;
        if(!check(nx, ny, cave.length, cave[0].length)) continue;
        if(dist[nx][ny] > dist[x][y] + cave[nx][ny]) {
          dist[nx][ny] = dist[x][y] + cave[nx][ny];
          nextQueue.push([nx, ny]);
        }
      }
    }
    queue = nextQueue;
  }
  return dist[cave.length - 1][cave[0].length - 1];
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
    result.push(bfs());
    return;
  }
  cave.push(line.split(' ').map(Number));
}).on('close', () => {
  console.log(result.map((e, i) => `Problem ${i + 1}: ${e}`).join('\n'));
  process.exit();
})
