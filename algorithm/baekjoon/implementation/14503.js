// https://www.acmicpc.net/problem/14503
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `11 10
7 4 0
1 1 1 1 1 1 1 1 1 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 1 1 1 1 0 1
1 0 0 1 1 0 0 0 0 1
1 0 1 1 0 0 0 0 0 1
1 0 0 0 0 0 0 0 0 1
1 0 0 0 0 0 0 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 1 1 0 1
1 0 0 0 0 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1`;
const [NM, rcd, ...data] = input.split('\n');
let [r, c, d] = rcd.split(' ').map(Number);
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
console.log(solution(r, c, d, data.map(e => e.split(' ').map(Number))));

function solution (r, c, d, data) {
  let cleaned = 0;
  const check1 = (x, y) => data[x][y] === 1;
  const check0 = (x, y) => data[x][y] === 0;

  const clean = (r, c) => {
    if(check0(r, c)) {
      data[r][c] = 2;
      cleaned++;
    } 
  }

  const turn = (d) => {
    return d === 0 ? 3 : d - 1;
  }

  const check4WClean = () => {
    for(const [dx, dy] of direction) {
      const nx = r + dx;
      const ny = c + dy;
      if(check0(nx, ny)) {
        return false;
      }
    }
    return true;
  }

  const go = (dx, dy) => {
    r = dx;
    c = dy;
  }

  const back = (d) => {
    return (d + 2) % 4;
  }

  while(1) {
    clean(r, c);
    if(check4WClean()) {
      const [dx, dy] = direction[back(d)];
      const nx = r + dx;
      const ny = c + dy;
      if(check1(nx, ny)) {
        break;
      } 
      go(nx, ny);
    } else {
      d = turn(d);
      const [dx, dy] = direction[d];
      const nx = r + dx;
      const ny = c + dy;
      if(check0(nx, ny)) {
        go(nx, ny);
      }
    }
  }

  return cleaned;
}