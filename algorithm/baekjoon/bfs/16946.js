// https://www.acmicpc.net/problem/16946
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `4 4
0000
0100
0000
0000`;
const [nm, ...data] = input.split('\n');
console.log(solution(nm.split(' ').map(Number), data));

function solution ([n, m], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const arr = Array.from({length: n}, () => Array(m).fill(-1));
  const visited = Array.from({length: n}, () => Array(m).fill(false));
  const result = Array.from({length: n}, () => Array(m).fill(0));
  const values = [];
  let cnt = 0;
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
  const bfs = ([iy, ix]) => {
    let queue = [[iy, ix]];
    const result = [[iy, ix]];
    let value = 1;
    visited[iy][ix] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] === '1') continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
          result.push([ny, nx]);
          value++;
        }
      }
      queue = nextQueue;
    }

    for(const [y, x] of result) {
      arr[y][x] = cnt;
    }
    values.push(value);
  }

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(data[y][x] === '1') continue;
      if(arr[y][x] > -1) continue;
      bfs([y, x]);
      cnt++;
    }
  }

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(data[y][x] === '0') continue;
      let sum = 1;
      const set = new Set();
      for(const [dy, dx] of direction) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(data[ny][nx] === '1') continue;
        if(set.has(arr[ny][nx])) continue;
        set.add(arr[ny][nx]);
        sum += values[arr[ny][nx]];
      }
      result[y][x] = sum % 10;
    }
  }

  return result.map(e => e.join('')).join('\n');
}