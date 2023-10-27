// https://www.acmicpc.net/problem/14676
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `4 4 5
1 2
1 3
2 4
3 4
1 1
1 2
1 3
2 1
1 4`;
const [nmk, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
const r = data.slice(0, nmk[1]);
const info = data.slice(nmk[1]);
console.log(solution(nmk, r, info));

function solution([n, m, k], r, info) {
  const ans = ["Lier!", "King-God-Emperor"]
  const graph = Array.from({length: n + 1}, () => []);
  const idg = Array(n + 1).fill(0);
  const cnt = Array(n + 1).fill(0);

  for(const [x, y] of r) {
    graph[x].push(y);
    idg[y]++;
  }

  for(const [a, nn] of info) {
    if(a === 1) {
      if(idg[nn] !== 0) return ans[0];
      if(++cnt[nn] === 1) {
        for(const node of graph[nn]) {
          idg[node]--;
        }
      }
    } else {
      if(cnt[nn] === 0) return ans[0];
      if(cnt[nn]-- === 1) {
        for(const node of graph[nn]) {
          idg[node]++;
        }
      }
    }
  }
    
  return ans[1];
}