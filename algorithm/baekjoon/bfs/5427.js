// https://www.acmicpc.net/problem/5427
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5
4 3
####
#*@.
####
7 6
###.###
#*#.#*#
#.....#
#.....#
#..@..#
#######
7 4
###.###
#....*#
#@....#
.######
5 5
.....
.***.
.*@*.
.***.
.....
3 3
###
#@#
###`;
const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
const [tc, ...data] = input.split('\n');
const result = [];
let idx = 0;
for(let i = 0; i < +tc; i++) {
  const [w, h] = data[idx++].split(' ').map(Number);
  const bd = data.slice(idx, idx += h).map(e => e.split(''));
  result.push(solution(w, h, bd));
}

console.log(result.join('\n'));

function solution (w, h, bd) {
  let fires = []
  let pos = [];
  for(let i = 0; i < h; i++) {
    for(let j = 0; j < w; j++) {
      if(bd[i][j] === '*') {
        fires.push([i, j]);
        continue;
      }
      if(bd[i][j] === '@') {
        pos.push([i, j, 0]);
        bd[i][j] = '.';
      };
    }
  }

  const check = (y, x) => 0 <= y && y < h && 0 <= x && x < w;

  const bfs = () => {
    const visited = Array.from({length: h}, () => Array(w).fill(false));
    visited[pos[0][0]][pos[0][1]] = true;
    while(pos.length > 0) {
      const nextFires = [];
      const nextPos = [];

      for(const [y, x] of fires) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(bd[ny][nx] !== '.') continue;
          bd[ny][nx] = '*';
          nextFires.push([ny, nx]);
        }
      }

      for(const [y, x, cnt] of pos) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) return cnt + 1;
          if(visited[ny][nx]) continue;
          if(bd[ny][nx] !== '.') continue;
          visited[ny][nx] = true;
          nextPos.push([ny, nx, cnt + 1]);
        }
      }

      fires = nextFires;
      pos = nextPos;
    }
    return 'IMPOSSIBLE';
  }

  return bfs();
}
