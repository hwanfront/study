// https://www.acmicpc.net/problem/23290
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10 25
1 1 1
1 1 2
1 1 3
1 1 4
1 1 5
1 1 6
1 1 7
1 1 8
2 1 1
2 1 1
2 1`;
const [MS, ...infos] = input.split('\n').map(e => e.split(' ').map(Number));
let sharkPos = infos.pop();
const GRID_LEN = 4;
console.log(solution(MS, infos, sharkPos));

function solution ([M, S], infos, sharkPos) {
  const getEmptyGrid = () => Array.from({length: GRID_LEN + 1}, () => Array.from({length: GRID_LEN + 1}, () => Array(9).fill(0)));
  let grid = getEmptyGrid();
  let max = -1;
  let maxPos = null;
  const smell = Array.from({length: GRID_LEN + 1}, () => Array(GRID_LEN + 1).fill(0));
  const direction = [,[0,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1]];
  const sdirection = [[-1,0],[0,-1],[1,0],[0,1]];
  const check = (y, x) => 0 < y && y <= GRID_LEN && 0 < x &&  x <= GRID_LEN;

  const fmove = (grid) => {
    const newGrid = getEmptyGrid();

    for(let y = 1; y <= GRID_LEN; y++) {
      for(let x = 1; x <= GRID_LEN; x++) {
        for(let d = 1; d < direction.length; d++) {
          if(grid[y][x][d] === 0) continue;
          let newD = d;
          let flag = false;
          while(1) {
            let [dy, dx] = direction[newD];
            let [ny, nx] = [dy + y, dx + x];
            if((newD === d && flag)) {
              newGrid[y][x][d] += grid[y][x][d];
              break;
            }
            if(!check(ny, nx) || smell[ny][nx] > 0 || (sharkPos[0] === ny && sharkPos[1] === nx)) {
              flag = true;
              newD = newD - 1 === 0 ? 8 : newD - 1;
              continue;
            }
            newGrid[ny][nx][newD] += grid[y][x][d];
            break;
          }
        }
      }
    }

    return newGrid;
  }

  const smove = ([y, x], pos, grid) => {
    if(pos.length === 3) {
      const visited = Array.from({length: GRID_LEN + 1}, () => Array(GRID_LEN + 1).fill(false));
      let sum = 0;
      for(const [py, px] of pos) {
        if(visited[py][px]) continue;
        visited[py][px] = true;
        sum += grid[py][px].reduce((pre, cur) => pre + cur, 0);
      }
      if(max < sum) {
        max = sum;
        maxPos = pos;
      }
      return;
    }

    for(const [dy, dx] of sdirection) {
      const [ny, nx] = [dy + y, dx + x];
      if(!check(ny, nx)) continue;
      smove([ny, nx], pos.concat([[ny, nx]]), grid);
    }
  }

  const removeSmell = () => {
    for(let i = 1; i <= GRID_LEN; i++) {
      for(let j = 1; j <= GRID_LEN; j++) {
        if(smell[i][j] === 0) continue;
        smell[i][j]--;
      }
    }
  }

  const replication = (tempGrid, nowGrid) => {
    const newGrid = getEmptyGrid();
    for(let i = 1; i <= GRID_LEN; i++) {
      for(let j = 1; j <= GRID_LEN; j++) {
        for(let k = 1; k <= 8; k++) {
          newGrid[i][j][k] = tempGrid[i][j][k] + nowGrid[i][j][k];
        }
      }
    }
    return newGrid;
  }


  for(const [fx, fy, d] of infos) {
    grid[fx][fy][d]++; 
  }

  for(let i = 0; i < S; i++) {
    max = -1;
    maxPos = [];
    const temp = JSON.parse(JSON.stringify(grid));
    const fmovedGrid = fmove(grid);
    smove(sharkPos, [], fmovedGrid);
    sharkPos = maxPos[2];
    removeSmell();
    for(const [py, px] of maxPos) {
      if(fmovedGrid[py][px].findIndex(e => e > 0) > -1) smell[py][px] = 2;
      fmovedGrid[py][px] = Array(9).fill(0);
    }
    const replicatedGrid = replication(temp, fmovedGrid);
    grid = replicatedGrid;
  }

  let result = 0;
  for(let i = 1; i <= GRID_LEN; i++) {
    for(let j = 1; j <= GRID_LEN; j++) {
      result += grid[i][j].reduce((pre, cur) => pre + cur, 0);
    }
  }
  return result;
}