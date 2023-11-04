// https://www.acmicpc.net/problem/21611
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5 1
0 0 0 0 0
0 0 1 1 0
0 1 0 1 0
0 1 1 1 0
0 0 0 0 0
1 2`;
const [nm, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
const cells = data.slice(0, nm[0]);
const ds = data.slice(nm[0]);
console.log(solution(nm, cells, ds));

function solution([n, m], cells, ds) {
  let visited = Array.from({length: n}, () => Array(n).fill(false));
  let info = Array(n * n).fill(0);
  const d = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  let dd = 0;
  let pos = [0, 0];
  let result = 0;

  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < n;

  for(let i = n * n - 1; i > 0; i--) {
    const [y, x] = pos;
    const [dy, dx] = d[dd % 4];
    const [ny, nx] = [y + dy, x + dx];
    info[i] = cells[y][x];
    visited[y][x] = true;
    if(!check(ny, nx) || visited[ny][nx]) {
      dd++;
      const [ddy, ddx] = d[dd % 4];
      pos = [y + ddy, x + ddx];
    } else {
      pos = [ny, nx];
    }
  }
  
  const ss = [,7,3,1,5];

  const getPos = (d, s) => {
    const result = [];
    let sum = 0;
    let cnt = 0;
    for(let i = 0; i < s; i++) {
      result.push(sum += cnt++ * 8 + ss[d]);
    }
    return result;
  }

  for(const [d, s] of ds) {
    const nextInfo = Array(n * n).fill(0);
    const pos = getPos(d, s);
    for(const idx of pos) {
      info[idx] = 0;
    }
    let cnt;
    let cur;
    let flag = false;
    while(1) {
      if(flag) {
        if(cnt.length > 3) {
          result += cnt.length * cur;
          cnt.forEach(e => info[e] = 0);
        }
        break;
      }
      cnt = [];
      cur = 0;
      flag = true;
      for(let i = 1; i < n * n; i++) {
        if(info[i] === 0) continue;
        if(cur !== info[i]) {
          if(cnt.length > 3) {
            flag = false;
            result += cnt.length * cur;
            cnt.forEach(e => info[e] = 0);
          }
          cur = info[i];
          cnt = [i];
        } else {
          cnt.push(i);
        }
      }
    }

    let idx = 1;
    cnt = 0;
    cur = 0;
    for(let i = 1; i < n * n; i++) {
      if(idx >= n * n) break;
      if(info[i] === 0) continue;
      if(cur !== info[i]) {
        if(cur !== 0) {
          nextInfo[idx++] = cnt;
          nextInfo[idx++] = cur;
        }
        cur = info[i];
        cnt = 1;
      } else {
        cnt++
      }
    }
    if(idx < n * n) {
      nextInfo[idx++] = cnt;
      nextInfo[idx++] = cur;
    }
    info = nextInfo;
  }

  return result;
}