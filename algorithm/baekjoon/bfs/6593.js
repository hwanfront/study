// https://www.acmicpc.net/problem/6593
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 4 5
S....
.###.
.##..
###.#

#####
#####
##.##
##...

#####
#####
#.###
####E

1 3 3
S##
#E#
###

0 0 0`;
const direction = [[0, 0, 1],[0, 1, 0],[0, 0, -1],[0, -1, 0], [1, 0, 0], [-1, 0, 0]];
const data = input.split('\n');
const result = [];
let idx = 0;
while(1) {
  const [L, R, C] = data[idx++].split(' ').map(Number);
  if(L === 0 || R === 0 || C === 0) break;
  const bds = [];
  for(let i = 0; i < L; i++) {
    const bd = data.slice(idx, idx += R).map(e => e.split(''));
    bds.push(bd);
    idx++;
  }
  result.push(solution(L, R, C, bds));  
}

console.log(result.join('\n'));

function solution (L, R, C, bds) {
  let queue = [];
  let e;
  for(let i = 0; i < L; i++) {
    for(let j = 0; j < R; j++) {
      for(let k = 0; k < C; k++) {
        if(bds[i][j][k] === 'S') { 
          queue.push([i, j, k, 0]);
          bds[i][j][k] = '#';
          continue; 
        }
        if(bds[i][j][k] === 'E') { 
          e = [i, j, k]; 
          continue; 
        }
      }
    }
  }

  const check = (z, y, x) => 0 <= z && 0 <= y && 0 <= x && z < L && y < R && x < C;
  
  while(queue.length > 0) {
    const nextQueue = [];
    for(const [z, y, x, cnt] of queue) {
      if(z === e[0] && y === e[1] && x === e[2]) return `Escaped in ${cnt} minute(s).`;
      for(const [dz, dy, dx] of direction) {
        const [nz, ny, nx] = [dz + z, dy + y, dx + x];
        if(!check(nz, ny, nx)) continue;
        if(bds[nz][ny][nx] === '#') continue;
        bds[nz][ny][nx] = '#'
        nextQueue.push([nz, ny, nx, cnt + 1]);
      }
    }
    queue = nextQueue;
  }

  return 'Trapped!'
}