// https://www.acmicpc.net/problem/
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `8
1 2 3 4 5 6 7 8
2 3 4 5 6 7 8 9
3 4 5 6 7 8 9 1
4 5 6 7 8 9 1 2
5 6 7 8 9 1 2 3
6 7 8 9 1 2 3 4
7 8 9 1 2 3 4 5
8 9 1 2 3 4 5 6`;
const [N, ...Arc] = input.split('\n');
console.log(solution(+N, Arc.map(e => e.split(' ').map(Number))));


function solution (N, data) {
  let result = Number.MAX_SAFE_INTEGER;
  let total = data.reduce((pre, cur) => {
    return pre + cur.reduce((p, c) => p + c, 0);
  }, 0);
  
  const draw = (x, y, d1, d2) => {
    let [s1, s2, s3, s4] = [0, 0, 0, 0];
    let s5 = total;
    const visited = Array.from({length: N + 1}, () => Array(N + 1).fill(false));

    for(let i = 0; i <= d1; i++) {
      visited[x + i][y - i] = true;
      visited[x + d2 + i][y + d2 - i] = true;
    }

    for(let i = 0; i <= d2; i++) {
      visited[x + i][y + i] = true;
      visited[x + d1 + i][y - d1 + i] = true;
    }

    for(let r = 1; r < x + d1; r++) {
      for(let c = 1; c <= y; c++) {
        if(visited[r][c]) break;
        s1 += data[r - 1][c - 1];
      }
    }

    for(let r = 1; r <= x + d2; r++) {
      for(let c = N; c > y; c--) {
        if(visited[r][c]) break;
        s2 += data[r - 1][c - 1];
      }
    }

    for(let r = x + d1; r <= N; r++) {
      for(let c = 1; c < y - d1 + d2; c++) {
        if(visited[r][c]) break;
        s3 += data[r - 1][c - 1];
      }
    }

    for(let r = x + d2 + 1; r <= N; r++) {
      for(let c = N; c >= y - d1 + d2; c--) {
        if(visited[r][c]) break;
        s4 += data[r - 1][c - 1];
      }
    }

    s5 -= (s1 + s2 + s3 + s4);
  
    return Math.max(s1, s2, s3, s4, s5) - Math.min(s1, s2, s3, s4, s5);
  }

  for(let x = 0; x < N; x++) {
    for(let y = 0; y < N; y++) {
      for(let d1 = 1; d1 < N; d1++) {
        for(let d2 = 1; d2 < N; d2++) {
          if(x + d1 + d2 > N) continue;
          if(y + d2 > N) continue;
          if(y - d1 < 1) continue;
          result = Math.min(result, draw(x, y, d1, d2));
        }
      }
    }
  }
  return result;
}