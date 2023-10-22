// https://www.acmicpc.net/problem/3197
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `8 17
...XXXXXX..XX.XXX
....XXXXXXXXX.XXX
...XXXXXXXXXXXX..
..XXXXX.LXXXXXX..
.XXXXXX..XXXXXX..
XXXXXXX...XXXX...
..XXXXX...XXX....
....XXXXX.XXXL...`;
const [rc, ...data] = input.split('\n');
console.log(solution(rc.split(' ').map(Number), data.map(e => e.split(''))));

function solution ([r, c], data) {
  let result = 0;
  const dr = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const visited = Array.from({length: r}, () => Array(c).fill(false));
  const visited2 = Array.from({length: r}, () => Array(c).fill(false));
  let xq = [];
  let lq = [];
  const check = (y, x) => 0 <= y && y < r && 0 <= x && x < c;
  for(let y = 0; y < r; y++) {
    for(let x = 0; x < c; x++) {
      if(data[y][x] === 'X') {
        let is = false;
        for(const [dy, dx] of dr) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(['.', 'L'].includes(data[ny][nx])) {
            is = true;
            break;
          }
        }
        if(is) xq.push([y, x]);
      }
      if(data[y][x] === 'L' && lq.length === 0) lq.push([y, x]);
    }
  }

  visited[lq[0][0]][lq[0][1]] = true;

  const bfs = () => {
    const nextQueue = []
    while(lq.length > 0) {
      const [y, x] = lq.shift();
      for(const [dy, dx] of dr) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(visited[ny][nx]) continue;
        visited[ny][nx] = true;
        if(data[ny][nx] === '.') lq.push([ny, nx]);
        if(data[ny][nx] === 'X') nextQueue.push([ny, nx]);
        if(data[ny][nx] === 'L') return [];
      }
    }
    return nextQueue;
  }

  const melt = () => {
    const nextQueue = [];
    for(const [y, x] of xq) {
      data[y][x] = '.';
      for(const [dy, dx] of dr) {
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(['.', 'L'].includes(data[ny][nx])) continue;
        if(visited2[ny][nx]) continue;
        visited2[ny][nx] = true
        nextQueue.push([ny, nx]);
      }
    }
    return nextQueue;
  }

  while(1) {
    const nextLq = bfs();
    if(nextLq.length === 0) break;
    const nextXq = melt();
    console.log(nextLq);
    console.log(nextXq);
    lq = nextLq;
    xq = nextXq;
    result++;
  }

  return result;
}