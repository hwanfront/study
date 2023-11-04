// https://www.acmicpc.net/problem/14889
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `8
0 5 4 5 4 5 4 5
4 0 5 1 2 3 4 5
9 8 0 1 2 3 1 2
9 9 9 0 9 9 9 9
1 1 1 1 0 1 1 1
8 7 6 5 4 0 3 2
9 1 9 1 9 1 0 9
6 5 4 3 2 1 9 0`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `.map(Number))));

function solution(n, data) {
  const sum = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  const visited = Array(n + 1).fill(false);
  let result = Number.MAX_SAFE_INTEGER;

  for(let y = 0; y < n; y++) {
    for(let x = y + 1; x < n; x++) {
      const s = data[y][x] + data[x][y];
      sum[y + 1][x + 1] = sum[x + 1][y + 1] = s;
    }
  }

  const dfs = (idx, cnt) => {
    if(cnt === n / 2) {
      let s1 = 0;
      let s2 = 0;
      for(let i = 1; i <= n; i++) {
        for(let j = i + 1; j <= n; j++) {
          if(visited[i] && visited[j]) {
            s1 += sum[i][j];
          }
          if(!visited[i] && !visited[j]) {
            s2 += sum[i][j];
          }
        } 
      }
      result = Math.min(result, Math.abs(s1 - s2));
      return;
    }

    for(let i = idx; i <= n; i++) {
      visited[i] = true;
      dfs(i + 1, cnt + 1);
      visited[i] = false;
    }
  }

  dfs(1, 0);
  return result;
}