// https://www.acmicpc.net/problem/20010
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `6 7
0 1 5395
0 2 540
0 4 7096
1 2 1051
2 4 4750
3 4 9616
3 5 9476`;
const [nk, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nk, data));

function solution ([n, k], data) {
  const parent = Array.from({length: n}, (_, i) => i);
  const graph = Array.from({length: n}, () => []);
  let result1 = 0;
  let result2;
  let visited;
  let lastNode;
  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 === s2) return;
    if(s1 < s2) parent[s2] = s1;
    else parent[s1] = s2;
  }

  const getSameParent = (x, y) => {
    return find(x) === find(y);
  }

  const dfs = (cur, cost) => {
    if(result2 < cost) {
      result2 = cost;
      lastNode = cur;
    }

    for(const [next, c] of graph[cur]) {
      if(visited[next]) continue;
      visited[next] = true;
      dfs(next, c + cost);
      visited[next] = false;
    }
  }

  data.sort((a, b) => a[2] - b[2]);

  for(const [a, b, c] of data) {
    if(getSameParent(a, b)) continue;
    union(a, b);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
    result1 += c;
  }

  visited = Array(n).fill(false);
  visited[0] = true;
  result2 = 0;
  dfs(0, 0);

  visited = Array(n).fill(false);
  visited[lastNode] = true;
  result2 = 0;
  dfs(lastNode, 0);

  return [result1, result2].join('\n');
}