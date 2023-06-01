// https://www.acmicpc.net/problem/1865
// # 벨만 포드는 가중치가 INF 일 때도 계속 계산을 해야하므로, Infinity 넣으면 overflow가 발생해서 5%에서 막힘

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4
3 3 1
1 2 2
1 3 4
2 3 1
3 1 3
3 2 1
1 2 3
2 3 4
3 1 8
3 2 2
1 2 3
2 3 4
3 1 2
2 1 5
1 1 1
1 1 3`;
const [TC, ...etc] = input.split('\n');
const arr = etc.map(e => e.split(' ').map(Number));
const result = [];
let cnt = 0;
for(let i = 0; i < Number(TC); i++) {
  const [N, M, W] = arr[cnt++];
  result.push(solution(N, M, W, arr.slice(cnt, cnt + M + W)));
  cnt += M + W;
}
console.log(result.join('\n'));

function solution(N, M, W, arr) {
  const edges = arr.slice(0,M).concat(arr.slice(M).map(([s, e, t]) => ([s, e, -t])));
  for(let i = 0; i < M; i++) {
    const [s, e, t] = arr[i];
    edges.push([e, s, t]);
  }
  const dist = Array(N + 1).fill(0);

  const bellman = (start) => {
    dist[start] = 0;
    for(let i = 1; i <= N; i++) {
      for(const [s, e, t] of edges) {
        if(dist[s] === Infinity) continue;
        if(dist[e] > dist[s] + t) {
          if(i === N) return 'YES'
          dist[e] = dist[s] + t;
        }
      }
    }
    return 'NO';
  }
  
  return bellman(N);
}