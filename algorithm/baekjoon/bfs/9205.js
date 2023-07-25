// https://www.acmicpc.net/problem/9205
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2
2
0 0
1000 0
1000 1000
2000 1000
2
0 0
1000 0
2000 1000
2000 2000`;
const [t, ...etc] = input.split('\n');
const result = [];
const MAX = 1000;
let idx = 0;
for(let i = 0; i < +t; i++) {
  const n = +etc[idx++];
  const coordinate = etc.slice(idx, idx + n + 2).map(e => e.split(' ').map(Number));
  idx += n + 2;
  result.push(solution(n, coordinate));
}

console.log(result.join('\n'));

function solution (n, coordinate) {
  const map = Array.from({ length: n + 2 }, () => []);

  for(let i = 0; i < n + 2; i++) {
    for(let j = i + 1; j < n + 2; j++) {
      const [ax, ay] = coordinate[i];
      const [bx, by] = coordinate[j];
      const check = MAX < Math.abs(bx - ax) + Math.abs(by - ay);
      if(check) continue;
      map[i].push(j);
      map[j].push(i);
    }
  }

  const bfs = (idx, n) => {
    const visited = Array(n + 2).fill(false);
    let queue = [idx];
    visited[idx] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const from = queue[i];
        const to = map[from];
        for(const num of to) {
          if(visited[num]) continue;
          if(num === n) return true;
          visited[num] = true;
          nextQueue.push(num);
        }
      }
      queue = nextQueue;
    }
    return false;
  }

  return bfs(0, n + 1) ? 'happy' : 'sad';
}