// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `8 8
R......R
.R...RR.
..R..RR.
........
.....R..
......R.
....I...
.......R
1444`;
const [rc, ...board] = input.split`\n`;
const d = board.pop();
console.log(solution(rc.split` `.map(Number), board.map(e => e.split``), d));

function solution([rr, cc], data, dd) {
  const direction = [null,[1, -1],[1, 0],[1, 1],[0, -1],[0, 0],[0, 1],[-1, -1],[-1, 0],[-1, 1]];
  let rs = [];
  let ii;
  let result = 0;
  for(let y = 0; y < rr; y++) {
    for(let x = 0; x < cc; x++) {
      if(data[y][x] === '.') continue;
      if(data[y][x] === 'R') rs.push([y, x]);
      else ii = [y, x];
    }
  }

  const moveI = (d) => {
    const [y, x] = ii;
    const [dy, dx] = direction[d];
    return [dy + y, dx + x];
  }
  
  const moveR = (ry, rx) => {
    const [iy, ix] = ii;
    let near = Number.MAX_SAFE_INTEGER;
    const pos = [ry, rx];
    for(let i = 1; i <= 9; i++) {
      const [dy, dx] = direction[i]
      const [ny, nx] = [dy + ry, dx + rx];
      const dist = Math.abs(iy - ny) + Math.abs(ix - nx);
      if(dist < near) {
        near = dist;
        pos[0] = ny;
        pos[1] = nx;
      }
    }
    return pos;
  }

  for(const d of dd) {
    const [iy, ix] = ii;
    data[iy][ix] = '.';
    const [niy, nix] = moveI(d);
    result++;
    if(data[niy][nix] === 'R') return `kraj ${result}`;
    ii = [niy, nix];
    data[niy][nix] = 'I';
    const map = new Map();
    for(const [ry, rx] of rs) {
      data[ry][rx] = '.';
      const [ny, nx] = moveR(ry, rx);
      if(data[ny][nx] === 'I') return `kraj ${result}`;
      const nn = `${ny} ${nx}`;
      if(!map.has(`${ny} ${nx}`)) {
        map.set(nn, false);
      } else {
        map.set(nn, true);
      }
    }
    const nextRs = [];
    map.forEach((v, k) => {
      if(v) return;
      const [y, x] = k.split` `.map(Number);
      nextRs.push([y, x]);
      data[y][x] = 'R';
    });
    rs = nextRs;
  }
  return data.map(e => e.join``).join`\n`;
}