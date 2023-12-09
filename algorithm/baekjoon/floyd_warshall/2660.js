// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `5
1 2
2 3
3 4
4 5
2 4
5 3
-1 -1`;
const [N, ...data] = input.split`\n`;
data.pop();
console.log(solution(+N, data.map(e => e.split` `.map(Number))));

function solution(N, data) {
  const floyd = Array.from({length: N + 1}, () => Array(N + 1).fill(Number.MAX_SAFE_INTEGER));

  for(let i = 1; i <= N; i++) {
    floyd[i][i] = 0;
  }

  for(const [a, b] of data) {
    floyd[a][b] = 1;
    floyd[b][a] = 1;
  }

  for(let k = 1; k <= N; k++) {
    for(let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
        }
      }      
    }
  }
  let m = Number.MAX_SAFE_INTEGER;
  let p = [];
  for(let i = 1; i <= N; i++) {
    let max = 0;
    for(let j = 1; j <= N; j++) {
      if(max >= floyd[i][j]) continue;
      max = floyd[i][j];
    }
    if(m > max) {
      m = max;
      p = [i];
    } else if(m === max) {
      p.push(i);
    }
  }

  return `${m} ${p.length}\n${p.join` `}`
}