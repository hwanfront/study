// https://www.acmicpc.net/problem/15684
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2 0 3`;
const [NMH, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const [N, M, H] = NMH;
console.log(solution(N, M, H, data));

function solution (N, M, H, data) {
  let res = Number.MAX_SAFE_INTEGER;
  const map = Array.from({length: H + 1}, () => Array(N + 1).fill(false))
  for(const [y, x] of data) {
    map[y][x] = true;
  }

  const check = () => {
    for(let i = 1; i <= N; i++) {
      let pos = i;
      for(let j = 1; j <= H; j++) {
      if(pos < N && map[j][pos]) {
          pos++;
        } else if(pos - 1 > 0 && map[j][pos - 1]) {
          pos--;
        }
      }
      if(i !== pos) {
        return false;
      }
    }
    return true;
  }

  const dfs = (y, x, cnt, to) => {
    if(to === cnt) {
      if(check()) {
        res = cnt;
      }
      return;
    }
   
    for(let i = y; i <= H; i++) {
      for(let j = 1; j < N; j++) {
        if(map[i][j - 1] || map[i][j] || map[i][j + 1]) continue;
        map[i][j] = true;
        dfs(i, j, cnt + 1, to);
        map[i][j] = false;
      }
    }
  }

  for(let i = 0; i <= 3; i++) {
    dfs(1, 1, 0, i);
    if(res !== Number.MAX_SAFE_INTEGER) {
      return res;
    }
  }

  return -1;
}