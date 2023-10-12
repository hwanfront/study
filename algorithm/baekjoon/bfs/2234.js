// https://www.acmicpc.net/problem/2234
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `7 4
11 6 11 6 3 10 6
7 9 6 13 5 15 5
1 10 12 7 13 7 5
13 11 10 8 10 12 13`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nm,  data));

function solution ([n, m], data) {
  const direction = [[0, -1],[-1, 0],[0, 1],[1, 0]];
  const visited = Array.from({length: m}, () => Array(n).fill(-1));
  const map = new Map();
  const size = [];
  let max1 = 0;
  let max2 = 0;

  const check = (y, x) => 0 <= y && y < m && 0 <= x && x < n;

  const bfs = (pos) => {
    let cnt = 1;
    let queue = [pos];
    visited[pos[0]][pos[1]] = size.length;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(let i = 0; i < 4; i++) {
          const [dy, dx] = direction[i];
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if((data[y][x] & (1 << i)) !== 0) {
            if(visited[ny][nx] !== -1 && visited[ny][nx] !== size.length) {
              if(!map.has(size.length)) {
                map.set(size.length, new Set([visited[ny][nx]]));
              } else {
                map.get(size.length).add(visited[ny][nx]);
              }

              if(!map.has(visited[ny][nx])) {
                map.set(visited[ny][nx], new Set([size.length]));
              } else {
                map.get(visited[ny][nx]).add(size.length);
              }
            }
            continue;
          }
          if(visited[ny][nx] !== -1) continue;
          visited[ny][nx] = size.length;
          nextQueue.push([ny, nx]);
          cnt++;
        }
      }
      queue = nextQueue;
    }
    return cnt;
  }

  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(visited[i][j] !== -1) continue;
      const cnt = bfs([i, j]);
      size.push(cnt);
      max1 = Math.max(max1, cnt);
    }
  }
  
  for(let i = 0; i < size.length; i++) {
    for(let j = 0; j < size.length; j++) {
      if(!map.get(i).has(j)) continue;
      max2 = Math.max(max2, size[i] + size[j]);
    }
  }

  return `${size.length}\n${max1}\n${max2}`
}