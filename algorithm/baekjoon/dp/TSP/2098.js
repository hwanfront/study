// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4
0 10 15 20
5 0 9 10
6 13 0 12
8 8 9 0`;
const [N, ...arr] = input.split('\n');
console.log(solution(Number(N), arr.map(e => e.split(' ').map(Number))));

function solution (N, arr) {
  const dist = Array.from({ length: N }, () => Array(1 << N).fill(-1));

  dist[0][0] = 0;
  const tsp = (now, visited) => {
    visited = visited | (1 << now);
    
    if(visited === (1 << N) - 1)  {
      return arr[now][0] === 0 ? Number.MAX_SAFE_INTEGER : arr[now][0]
    }

    if(dist[now][visited] !== -1) {
      return dist[now][visited];
    }

    dist[now][visited] = Number.MAX_SAFE_INTEGER;

    for(let i = 0; i < N; i++) {
      if(arr[now][i] === 0) continue;
      if((visited & (1 << i)) > 0) continue;
      dist[now][visited] = Math.min(dist[now][visited], tsp(i, visited) + arr[now][i]);
    }
    return dist[now][visited];
  }

  return tsp(0, 0);
}