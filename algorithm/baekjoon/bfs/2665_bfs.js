// https://www.acmicpc.net/problem/2665
// dijkstra 가능
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
function solution (n, data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const dist = Array.from({length: n}, () => Array(n).fill(Number.MAX_SAFE_INTEGER));
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;
  const dijkstra = () => {
    let queue = [[0, 0]];
    dist[0][0] = 0;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(dist[ny][nx] > dist[y][x]) {
            if(data[ny][nx] === '0') {
              dist[ny][nx] = dist[y][x] + 1;
            } else {
              dist[ny][nx] = dist[y][x];
            }
            nextQueue.push([ny, nx]);
          }
        }
      }
      queue = nextQueue;
    }
  }
  dijkstra()
  return dist[n - 1][n - 1];
}

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [n, ...data] = input;
  console.log(solution(+n, data.map(e => e.split(''))));
})
