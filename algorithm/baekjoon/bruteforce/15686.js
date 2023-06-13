// https://www.acmicpc.net/problem/15686
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 3
0 0 1 0 0
0 0 2 0 1
0 1 2 0 0
0 0 1 0 0
0 0 0 0 2`;
const [NM, ...arr] = input.split('\n');
const [N, M] = NM.split(' ');
const village = arr.map((e) => e.split(' '));

console.log(solution(N, M, village));

function solution(N, M, village) {
  let result = Number.MAX_SAFE_INTEGER;
  const house = [];
  const chicken = [];

  village.forEach((line, x) => {
    line.forEach((p, y) => {
      if(p === '1') {
        house.push([x, y]);
      }
      if(p === '2') {
        chicken.push([x, y]);
      }
    })
  })

  const visited = Array(chicken.length).fill(false);
  const stack = [];

  const dfs = (num) => {
    if(stack.length <= M) {
      const dist = Array(house.length).fill(Number.MAX_SAFE_INTEGER);
      for(const c of stack) {
        for(let i = 0; i < house.length; i++) {
          const [r1, c1] = house[i];
          const [r2, c2] = c;
          const newDist = Math.abs(r2 - r1) + Math.abs(c2 - c1);
          dist[i] = Math.min(newDist, dist[i]);
        }
      }
      result = Math.min(result, dist.reduce((pre, cur) => pre + cur, 0));
    }

    for(let i = num; i < chicken.length; i++) {
      if(!visited[i]) {
        for(let j = 0; j < i; j++) {
          visited[j] = true;
        }
        visited[i] = true;
        stack.push(chicken[i]);
        dfs(num++);
        for(let j = 0; j < i; j++) {
          visited[j] = false;
        }
        visited[i] = false;
        stack.pop();
      }
    }

  }

  dfs(0);

  return result;
}
