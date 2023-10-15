// https://www.acmicpc.net/problem/11559
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `......
......
......
......
......
......
......
......
......
......
......
..GGGG`;
const data = input.split('\n').map(e => e.split(''));
console.log(solution(data));

function solution (data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const h = 12;
  const w = 6;
  let visited = Array.from({length: h}, () => Array(w).fill(false));
  let result = 0;

  const check = (y, x) => 0 <= y && y < h && 0 <= x && x < w;

  const bfs = (pos, color) => {
    let queue = [pos];
    const res = [pos];

    while(queue.length > 0) {
      const nextQueue = []
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(color !== data[ny][nx]) continue;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
          res.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }

    if(res.length > 3) {
      for(const [y, x] of res) {
        data[y][x] = '.';
      }
      return true;
    }
    return false;
  }

  while(1) {
    visited = Array.from({length: h}, () => Array(w).fill(false));
    let is = false;

    for(let y = h - 1; y >= 0; y--) {
      let check = false;
      for(let x = 0; x < w; x++) {
        if(data[y][x] === '.') continue;
        check = true;
        if(visited[y][x]) continue;
        visited[y][x] = true;
        if(bfs([y, x], data[y][x])) is = true;
      }
    } 

    if(is) {
      result++;
      for(let x = 0; x < w; x++) {
        const arr = []
        for(let y = h - 1; y >= 0; y--) {
          if(data[y][x] === '.') continue;
          arr.push(data[y][x]);
          data[y][x] = '.';
        }
        let y = h - 1;
        for(const color of arr) {
          data[y--][x] = color;
        }
      }
    } else {
      break;
    }
  }

  return result;
}