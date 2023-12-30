// https://www.acmicpc.net/problem/16940
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
  const order = Array(n + 1).fill(0);
  
  for(const [a, b] of data) {
    graph[a].push(b);
    graph[b].push(a);
  }
  
  for(let i = 0; i < n; i++) {
    order[nums[i]] = i + 1;
  }
  
  graph.map(e => e.sort((a, b) => order[a] - order[b]));
  
  const bfs = () => {
    const visited = Array(n + 1).fill(false);
    let queue = [];
    let now = 0;
    if(nums[now++] !== 1) return 0;
    queue.push(1);
    visited[1] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const node of queue) {
        for(const next of graph[node]) {
          if(visited[next]) continue;
          if(nums[now++] !== next) return 0;
          visited[next] = true;
          nextQueue.push(next);
        }
      }
      queue = nextQueue;
    }
    return 1;
  }
  
  return bfs();
}