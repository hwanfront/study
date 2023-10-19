// https://www.acmicpc.net/problem/16932
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `3 4
1 1 1 1
1 1 0 1
1 1 1 1`;
const [nm, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nm, data));

function solution ([n, m], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: n}, () => Array(m).fill(-1));
  const arr = [];
  let result = 0;

  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m; 
  const bfs = (pos) => {
    let queue = [pos];
    visited[pos[0]][pos[1]] = arr.length;
    let cnt = 1;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx] > -1) continue;
          if(data[ny][nx] === 0) continue;
          visited[ny][nx] = arr.length;
          cnt++;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }
    arr.push(cnt);
  }

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(data[y][x] === 0) continue;
      if(visited[y][x] > -1) continue;
      bfs([y, x]);
    }
  }

  const v = Array(arr.length).fill(false);

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(visited[y][x] > -1) continue;
      let sum = 0;
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(visited[ny][nx] === -1) continue;
        if(v[visited[ny][nx]]) continue;
        v[visited[ny][nx]] = true;
        sum += arr[visited[ny][nx]];
      }

      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        v[visited[ny][nx]] = false;
      }
      result = Math.max(result, sum)
    }
  }

  return result + 1;
}