// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3
2 Z ABC
2 ABC Z
2 ZZ ABC`;
const [n, ...data] = input.split`\n`;
console.log(solution(+n, data.map(e => e.split` `)));

function solution(n, data) {
  const MAX = 20000;
  const next = Array.from({length: MAX}, () => (new Map()));
  const root = 1;
  let nextIdx = 1;
  const result = [];
  for(const [cnt, ...ss] of data) {
    let cur = root;
    for(const s of ss) {
      if(!next[cur].has(s)) next[cur].set(s, ++nextIdx);
      cur = next[cur].get(s);
    }
  }

  for(let i = 1; i < MAX; i++) {
    next[i] = [...next[i]].sort();
  }

  const dfs = (node, depth) => {
    for(const [key, value] of next[node]) {
      result.push("--".repeat(depth) + key);
      dfs(value, depth + 1);
    }
  }

  dfs(1, 0);
  return result.join('\n');
}

