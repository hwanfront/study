// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `4
1 2
1 3
2 4
1 2 4 3`;
const [n, ...data] = input.split`\n`;
const nums = data.pop().split` `.map(Number);
console.log(solution(+n, data.map(e => e.split` `.map(Number)), nums));

function solution(n, data, nums) {
  const graph = Array.from({length: n + 1}, () => []);
  const check = Array(n + 1).fill(false);
  const order = Array(n + 1).fill(0);
  const result = [];

  for(const [a, b] of data) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  for(let i = 0; i < n; i++) {
    order[nums[i]] = i + 1;
  }
  
  graph.map(e => e.sort((a, b) => order[a] - order[b]));

  const dfs = (x) => {
    if(check[x]) return;
    check[x] = true;
    result.push(x);
    for(const y of graph[x]) {
      dfs(y)
    }
    return true;
  }
  if(nums[0] !== 1) return 0;

  dfs(1);

  for(let i = 0; i < n; i++) {
    if(nums[i] !== result[i]) {
      return 0;
    }
  }

  return 1;
}
