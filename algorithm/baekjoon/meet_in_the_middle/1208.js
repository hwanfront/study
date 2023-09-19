// https://www.acmicpc.net/problem/1208
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `3 1
1 0 -1`;
const [ns, data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(ns, data));

function solution ([n, s], data) {
  let result = 0;
  const map = new Map();
  const mid = Math.floor((n / 2));
  const dfs1 = (from, to, sum) => {
    if(from === to) {
      if(!map.has(sum)) map.set(sum, 0);
      map.set(sum, map.get(sum) + 1);
      return;
    }
    dfs1(from + 1, to, sum + data[from]);
    dfs1(from + 1, to, sum);
  }
  dfs1(0, mid, 0);

  const dfs2 = (from, to, sum) => {
    if(from === to) {
      if(map.has(s - sum)) {
        result += map.get(s - sum);
      }
      return;
    }
    dfs2(from + 1, to, sum + data[from]);
    dfs2(from + 1, to, sum);
  }
  dfs2(mid, n, 0);
  if(s === 0) return result - 1;
  return result;
}