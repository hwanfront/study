// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5 4
2 2
1 1 E
5 4 W
1 F 7
2 F 7`;
const [ab, nm, ...data] = input.split`\n`.map(e => e.split` `);
const p = data.slice(0, +nm[0]);
const c = data.slice(+nm[0]);
console.log(solution(ab.map(Number), p, c));

function solution([a, b], p, c) {
  const arr = Array.from({length: b + 1}, () => Array(a + 1).fill(0));
  const robot = [null];
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  
  const check = (y, x) => 0 < y && y <= b && 0 < x && x <= a;

  for(let i = 0; i < p.length; i++) {
    const [x, y, d] = p[i];
    let dn;
    switch (d) {
    case 'E': dn = 0; break;
    case 'S': dn = 3; break;
    case 'W': dn = 2; break;
    case 'N': dn = 1;
    }
    robot.push([+y, +x, dn]);
    arr[y][x] = i + 1;
  }

  for(const [r, cm, cnt] of c) {
    const [y, x, dn] = robot[+r];
    if(cm === 'L') {
      robot[r] = [y, x, (dn + +cnt) % 4];
      continue;
    }
    if(cm === 'R') {
      robot[r] = [y, x, (dn - cnt + 104) % 4];
      continue;
    }
    arr[y][x] = 0;

    let [ny, nx] = [y, x];
    const [dy, dx] = direction[dn];
    for(let i = 0; i < cnt; i++) {
      ny += dy;
      nx += dx;
      if(!check(ny, nx)) return `Robot ${r} crashes into the wall`;
      if(arr[ny][nx] > 0) return `Robot ${r} crashes into robot ${arr[ny][nx]}`;
    }
    arr[ny][nx] = +r;
    robot[r] = [ny, nx, dn];
  }

  return 'OK';
}