// https://www.acmicpc.net/problem/2533
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `9
1 2
1 3
2 4
3 5
3 6
4 7
4 8
4 9`;
const [N, ...nums] = input.split('\n');
console.log(solution(+N, nums.map(e => e.split(' ').map(Number))));
function solution (N, nums) {
  const visited = Array(N + 1).fill(false);
  const dp = Array.from({length: N + 1}, () => ([0, 0]));
  const arr = Array.from({length: N + 1}, () => []);

  for(const [u, v] of nums) {
    arr[u].push(v);
    arr[v].push(u);
  }

  const dfs = (cur) => {
    if(visited[cur]) return;
    visited[cur] = true;
    dp[cur][0] = 1;
    for(const next of arr[cur]) {
      if(visited[next]) continue;
      dfs(next);
      dp[cur][1] += dp[next][0];
      dp[cur][0] += Math.min(...dp[next]);
    }
  }

  dfs(1);
  return Math.min(...dp[1]);
}