// https://www.acmicpc.net/problem/17143
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 6 6
1 1 0 4 1
1 2 1 4 2
1 3 2 4 3
1 4 3 4 4
1 5 4 4 5
1 6 5 4 6`;
const [RCM, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(RCM, info));

function solution ([R, C, M], info) {
  if(M === 0) return 0;
  const getEmptyGrid = () => Array.from({length: R + 1}, () => Array.from({length: C + 1}, () => -1));
  const direction = [, [-1, 0], [1, 0], [0, 1], [0, -1]]
  const shark = Array.from({length: M}, () => ({}));
  let grid = getEmptyGrid();
  let fisherY = 0;
  let result = 0;
  let cnt = 0;

  for(let i = 0; i < M; i++) {
    const [r, c, s, d, z] = info[i];
    grid[r][c] = i;
    if(d < 3) { // 위 아래
      shark[i] = {r, c, s: s % ((R - 1) * 2), d, z};
    } else { // 우 좌
      shark[i] = {r, c, s: s % ((C - 1) * 2), d, z};
    }
  }

  const check = (y, x) => 0 < y && y <= R && 0 < x && x <= C;

  const fishing = () => {
    for(let i = 1; i <= R; i++) {
      const sl = grid[i][fisherY];
      if(sl !== -1) {
        grid[i][fisherY] = -1;
        result += shark[sl].z;
        shark[sl].r = 0;
        cnt++;
        break;
      }
    }
  }

  const move = () => {
    const newGrid = getEmptyGrid();
    for(let i = 0; i < M; i++) {
      if(shark[i].r === 0) continue;
      const {r, c, s, d, z} = shark[i];

      let nr = r;
      let nc = c;
      let nd = d;
      for(let i = 0; i < s; i++) {
        let [dr, dc] = direction[nd];
        if(!check(nr + dr, nc + dc)) {
          if(nd === 1) nd = 2;
          else if (nd === 2) nd = 1;
          else if (nd === 3) nd = 4;
          else nd = 3;
          [dr, dc] = direction[nd];
        }
        nr += dr;
        nc += dc;
      }

      if(newGrid[nr][nc] === -1) {
        newGrid[nr][nc] = i;
        shark[i].r = nr;
        shark[i].c = nc;
        shark[i].d = nd;
      } else {
        const nz = shark[newGrid[nr][nc]].z;
        if(nz > z) shark[i].r = 0;
        else {
          shark[newGrid[nr][nc]].r = 0;
          newGrid[nr][nc] = i;
          shark[i].r = nr;
          shark[i].c = nc;
          shark[i].d = nd;
          cnt++;
        }
      }
    }
    return newGrid;
  }

  for(let i = 0; i < C; i++) {
    if(cnt === M) return result;
    fisherY += 1;
    fishing();
    grid = move();
  }

  return result;
}