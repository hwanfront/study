// https://www.acmicpc.net/problem/17471
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6
2 3 4 5 6 7
2 2 3
2 1 3
2 1 2
2 5 6
2 4 6
2 4 5`;
let [N, pp, ...info] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(N[0], pp, info));

function solution (N, pp, info) {
  let result = Number.MAX_SAFE_INTEGER;
  const visited = Array(N + 1).fill(false);
  const arr = [null]

  const sum = (a, b) => a + pp[b - 1];

  const bfs = (nums) => {
    const v = Array(N + 1).fill(false);
    let queue = [nums[0]];
    let cnt = 1;
    v[nums[0]] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      for(const n of queue) {
        const nodes = arr[n];
        for(const node of nodes) {
          if(v[node]) continue;
          if(!nums.includes(node)) continue;
          cnt++;
          v[node] = true;
          nextQueue.push(node);
        }
      }
      queue = nextQueue;
    }

    if(cnt === nums.length) return true;
    return false;
  }

  const dfs = (cnt, idx) => {
    if(cnt > 0) {
      const a = [];
      const b = [];
      for(let i = 1; i <= N; i++) {
        if(visited[i]) a.push(i);
        else b.push(i);
      }
      if(bfs(a) && bfs(b)) result = Math.min(result, Math.abs(a.reduce(sum, 0) - b.reduce(sum, 0)));
    }

    for(let i = idx; i < N; i++) {
      if(visited[i]) continue;
      visited[i] = true;
      dfs(cnt + 1, i + 1);
      visited[i] = false;
    }
  }

  for(const [, ...nums] of info) {
    arr.push(nums);
  }

  dfs(0, 1);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}
