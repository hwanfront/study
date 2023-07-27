// https://www.acmicpc.net/problem/21608
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
4 2 5 1 7
2 1 9 4 5
5 8 1 4 3
1 2 9 3 4
7 2 3 4 8
9 8 4 5 7
6 5 2 3 4
8 4 9 2 1
3 9 2 1 4`;
const direction = [[-1, 0],[0, -1],[0, 1], [1, 0]];
const [N, ...orders] = input.split('\n')
console.log(solution(+N, orders.map(e => e.split(' ').map(Number))));

function solution (N, orders) {
  const positions = Array.from({length: N + 1}, () => Array(N + 1).fill(-1));
  const friends = Array(Math.pow(2, N) + 1).fill(null);
  const satisfaction = Array.from({length: N + 1}, () => Array(N + 1).fill(0));
  let result = 0;

  const check = (y, x) => 0 < y && y <= N && 0 < x && x <= N;

  const find = ([r, c], f) => {
    let cntF = 0;
    let cntEmpty = 0;
    for(const [dr, dc] of direction) {
      const nr = r + dr;
      const nc = c + dc;
      if(!check(nr, nc)) continue;
      if(positions[nr][nc] === -1) {
        cntEmpty++;
        continue;
      } 
      if(f.includes(positions[nr][nc])) cntF++;
    }
    return [cntF, cntEmpty];
  }

  const [firstS, ...firstF] = orders[0];
  positions[2][2] = firstS;
  friends[firstS] = firstF;

  for(let i = 1; i < orders.length; i++) {
    const [s, ...f] = orders[i];
    friends[s] = f;
    let maxF = -1;
    let myEmpty = -1;
    let myR = 0;
    let myC = 0;
    for(let r = 1; r <= N; r++) {
      for(let c = 1; c <= N; c++) {
        if(positions[r][c] === -1) {
          const [cntF, cntEmpty] = find([r, c], f);
          if(cntF > maxF) {
            maxF = cntF;
            myEmpty = cntEmpty;
            myR = r;
            myC = c;
          }
          if(cntF === maxF && cntEmpty > myEmpty) {
            maxF = cntF;
            myEmpty = cntEmpty;
            myR = r;
            myC = c;
          }
        }
      }
    }

    positions[myR][myC] = s;

    for(const [dr, dc] of direction) {
      const nr = dr + myR;
      const nc = dc + myC;
      if(!check(nr, nc)) continue;
      if(positions[nr][nc] === -1) continue;
      const target = positions[nr][nc];
      if(friends[target].includes(s)) satisfaction[nr][nc]++;
      if(friends[s].includes(target)) satisfaction[myR][myC]++;
    }
  }

  for(let i = 1; i <= N; i++) {
    for(let j = 1; j <= N; j++) {
      switch(satisfaction[i][j]) {
      case 0: result += 0; break;
      case 1: result += 1; break;
      case 2: result += 10; break;
      case 3: result += 100; break;
      case 4: result += 1000; break;
      default: result += 0; break;
      }
    }
  }

  return result;
}