// https://www.acmicpc.net/problem/17136
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 0 0 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 0 0 0 0`;

const data = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(data));


function solution (data) {
  let result = Number.MAX_SAFE_INTEGER;
  const numCnt = Array(6).fill(0);
  const check = () => {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        if(data[i][j] === 1) return false;
      }
    }
    return true;
  }
  const isPos = (y, x, n) => {
    for(let i = y; i < y + n; i++) {
      for(let j = x; j < x + n; j++) {
        if(data[i][j] === 0) return false;
      }
    }
    return true;
  }
  const draw = (y, x, n, c) => {
    for(let i = y; i < y + n; i++) {
      for(let j = x; j < x + n; j++) {
        data[i][j] = c;
      }
    }
  }

  const dfs = (cnt) => {
    if(check()) {
      if(cnt === 6) {

        console.log(data.map(e => e.join(' ')));
        console.log(numCnt);
        console.log(cnt);
      }
      result = Math.min(cnt, result);
      return;
    }

    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        if(data[i][j] === 1) {
          for(let k = 5; k >= 1; k--) {
            if(i + k > 10 || j + k > 10) continue;
            if(numCnt[k] >= 5) continue;
            if(!isPos(i, j, k)) continue;
            numCnt[k]++;
            draw(i, j, k, 0);
            dfs(cnt + 1);
            numCnt[k]--;
            draw(i, j, k, 1);
          }
          return;
        }
      }
    }
  }
  dfs(0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}
