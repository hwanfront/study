// https://www.acmicpc.net/problem/15663
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 3
9 9 9 1`;
const [NM, nums] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NM, nums));

function solution ([N, M], nums) {
  const visited = Array(N).fill(false);
  const set = new Set();
  nums.sort((a, b) => a - b);
  const dfs = (cnt, str) => {
    if(cnt === M) {
      set.add(str.trim());
      return;
    }
    
    for(let i = 0; i < N; i++) {
      if(visited[i]) continue;
      visited[i] = true;
      dfs(cnt + 1, str + `${nums[i]} `);
      visited[i] = false;
    }
  }
  dfs(0, '');
  return [...set].join('\n');
}