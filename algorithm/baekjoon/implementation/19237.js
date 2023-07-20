// https://www.acmicpc.net/problem/19237
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 4 10
0 0 0 0 3
0 0 0 0 0
1 2 0 0 0
0 0 0 0 4
0 0 0 0 0
4 4 3 1
2 3 1 4
4 1 2 3
3 4 2 1
4 3 1 2
2 4 3 1
2 1 3 4
3 4 1 2
4 1 2 3
4 3 2 1
1 4 3 2
1 3 2 4
3 2 1 4
3 4 1 2
3 2 4 1
1 4 2 3
1 4 2 3`;
const [NMK, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M, K] = NMK; 
const initSharkDirection = [null].concat(data[N]);
let sharkPos = Array(M).fill(null);
let grid = [Array(N).fill(null)].concat(data.slice(0, N).map((e, y) => {
  return e.map((el, x) => {
    if(el === 0) {
      return null;
    }
    sharkPos[el] = [y + 1, x + 1, initSharkDirection[el]];
    return [el, K];
  });
})).map(e => [null].concat(e));
const direction = [null,[-1, 0],[1, 0],[0, -1],[0, 1]]; // 1 상 2 하 3 좌 4 우
const etc = data.slice(N + 1);
const sharkDirection = [null, ];
for(let i = 0; i < M; i++) {
  sharkDirection.push([null, etc[i * 4], etc[i * 4 + 1], etc[i * 4 + 2], etc[i * 4 + 3]])
}
console.log(solution(N, M, K, grid, sharkPos, sharkDirection));

function solution (N, M, K, grid, sp, sd) {
  const check = (y, x) => 0 < y && y <= N && 0 < x && x <= N;
  const smell = (grid, moveData) => {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= N; j++) {
        if(newGrid[i][j] === null) continue;
        const [shark, smell] = newGrid[i][j]
        if(smell === 1) newGrid[i][j] = null;
        else newGrid[i][j] = [shark, smell - 1];
      }
    }

    for(let i = 1; i <= M; i++) {
      if(moveData[i] === null) continue;
      const [y, x] = moveData[i];
      newGrid[y][x] = [i, K];
    }

    return newGrid;
  }

  const move = (to) => {
    const moveData = Array(M + 1).fill(null);
    const grid = Array.from({length: N + 1}, () => Array(N + 1).fill(0));

    for(const [now, ny, nx, di] of to) {
      if(grid[ny][nx] > 0) {
        const prev = grid[ny][nx];
        if(prev < now) {
          moveData[now] = null;
          continue;
        }
        grid[ny][nx] = now;
        moveData[prev] = null;
        continue;
      } 
      grid[ny][nx] = now;
      moveData[now] = [ny, nx, di];
    }
    return moveData;
  }

  let result = 0;

  while(1) {
    if(++result > 1000) {
      return -1;
    }

    const to = [];
    for(let i = 1; i <= M; i++) {
      if(sp[i] === null) continue;
      const [y, x, d] = sp[i];
      let isEmpty = false;
      for(const di of sd[i][d]) {
        const [dy, dx] = direction[di];
        const [ny, nx] = [dy + y, dx + x];
        if(!check(ny, nx)) continue;
        if(grid[ny][nx] !== null) continue;
        isEmpty = true;
        to.push([i, ny, nx, di])
        break;
      }
  
      if(!isEmpty) {
        for(const di of sd[i][d]) {
          const [dy, dx] = direction[di];
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(grid[ny][nx][0] !== i) continue;
          to.push([i, ny, nx, di])
          break;
        }
      }
    }

    sp = move(to);

    let hasShark = false;

    for(let i = 2; i <= M; i++) {
      if(sp[i] !== null) {
        hasShark = true;
        break;
      }
    }

    if(!hasShark) {
      break;
    }

    grid = smell(grid, sp);
  }
  return result;
}