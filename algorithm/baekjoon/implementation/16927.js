// https://www.acmicpc.net/problem/16927
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3 3 3
1 2 3
4 5 6
7 8 9`;
const [nmr, ...data] = input.split('\n').map(e => e.split` `.map(Number));
console.log(solution(nmr, data));

function solution ([n, m, r], data) {
  const direction = [[1, 0],[0, 1],[-1, 0],[0, -1]];
  const check = (y, x, i) => 0 + i <= y && y < n - i && 0 + i <= x && x < m - i;
  const go = () => {
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    const arr = Array.from({length: n}, () => Array(m).fill(0));
    let idx = 0;
    while(1) {
      const len = (2 * (n + m - (4 * idx) - 2));
      const rr = r % len;
      let from = [idx, idx];
      if(visited[idx][idx]) break;
      let to = [idx, idx];
      let d0 = 0;
      let d1 = 0;
      for(let i = 0; i < rr; i++) {
        while(1) {
          let [dy, dx] = direction[d1 % 4];
          let [ny, nx] = [to[0] + dy, to[1] + dx];
          if(!check(ny, nx, idx)) {
            d1++;
            continue;
          }
          to[0] = ny;
          to[1] = nx;
          break;
        }
      }
    
      visited[from[0]][from[1]] = true;
      arr[to[0]][to[1]] = data[from[0]][from[1]];

      for(let i = 0; i < len; i++) {
        while(1) {
          let [d0y, d0x] = direction[d0 % 4];
          let [n0y, n0x] = [from[0] + d0y, from[1] + d0x];
          if(!check(n0y, n0x, idx)) {
            d0++;
            continue;
          }
          from[0] = n0y;
          from[1] = n0x;
          break;
        }

        while(1) {
          let [d1y, d1x] = direction[d1 % 4];
          let [n1y, n1x] = [to[0] + d1y, to[1] + d1x];
          if(!check(n1y, n1x, idx)) {
            d1++;
            continue;
          }
          to[0] = n1y;
          to[1] = n1x;
          break;
        }
        visited[from[0]][from[1]] = true;
        arr[to[0]][to[1]] = data[from[0]][from[1]];
      }

      idx++;
    }
    return arr;
  }
  
  const arr = go();

  for(let y = 0; y < n; y++) {
    for(let x = 0; x < m; x++) {
      if(arr[y][x] === 0) arr[y][x] = data[y][x];
    }
  }

  return arr.map(e => e.join` `).join`\n`;
}