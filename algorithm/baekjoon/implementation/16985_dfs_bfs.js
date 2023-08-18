// https://www.acmicpc.net/problem/16985
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `0 0 1 0 0
0 0 0 0 0
1 1 0 0 0
0 0 1 0 0
1 1 1 0 0
0 0 0 0 1
1 0 0 0 0
0 1 0 0 1
0 0 0 0 0
0 1 0 1 0
1 0 0 0 1
1 1 1 1 1
1 1 0 0 0
0 0 0 1 0
0 0 0 1 0
0 0 0 1 1
0 0 1 0 0
0 1 1 1 0
1 0 0 0 0
0 1 1 0 1
0 1 0 0 0
0 0 0 1 0
1 0 0 0 0
0 0 0 1 0
0 0 0 1 0`;
const MAX = 9999;
const LEN = 5;
const data = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(data));
function solution (data) {
  const direction = [[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]];
  let result = MAX;
  let plates = [data.slice(0, 5), data.slice(5, 10), data.slice(10, 15), data.slice(15, 20), data.slice(20, 25)];
  const v = Array(5).fill(false);
  const check = (dz, dy, dx) => 0 <= dz && dz < LEN && 0 <= dy && dy < LEN && 0 <= dx && dx < LEN

  const spin = (plate) => {
    const result = Array.from({length: 5}, () => Array(5).fill(0));
    for(let i = 0; i < LEN; i++) {
      for(let j = 0; j < LEN; j++) {
        if(plate[LEN - 1 - j][i] === 0) continue;
        result[i][j] = 1;
      }
    }
    return result;
  }

  const find = (p) => {
    if(p[0][0][0] === 0) return MAX;
    const visited = Array.from({length: LEN}, () => Array.from({length: LEN}, () => Array(LEN).fill(false)));
    let queue = [[0, 0, 0, 0]];
    visited[0][0][0] = true;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [z, y, x, cnt] of queue) {
        if(y === LEN - 1 && x === LEN - 1 && z === LEN - 1) return cnt;
        for(const [dz, dy, dx] of direction) {
          const [nz, ny, nx] = [dz + z, dy + y, dx + x];
          if(!check(nz, ny, nx)) continue;
          if(visited[nz][ny][nx]) continue;
          if(p[nz][ny][nx] === 0) continue;
          visited[nz][ny][nx] = true;
          nextQueue.push([nz, ny, nx, cnt + 1]);
        }
      }
      queue = nextQueue;
    }

    return MAX;
  }

  const dfs = (p) => {
    if(result === 12) return;
    if(p.length === 5) {
      result = Math.min(result, find(p));
      return;
    }

    for(let i = 0; i < 5; i++) {
      if(v[i]) continue;
      let newPlate = plates[i];
      v[i] = true;
      for(let j = 0; j < 4; j++) {
        dfs([...p, newPlate]);
        newPlate = spin(newPlate);
      }
      v[i] = false;
    }
  }


  dfs([]);

  return result === MAX ? -1 : result;
}