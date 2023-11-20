// https://www.acmicpc.net/problem/1939
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `10000 3
9998 9999 2
10000 9998 3
9999 10000 2
9998 10000`;
const [NM, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
const f = data.pop();
console.log(solution(NM, data, f));

function solution([N, M], data, [f1, f2]) {
  const parent = Array.from({length: N + 1}, (_, i) => i);
  let max = 0;
  data.sort((a, b) => b[2] - a[2]);

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

  for(const [a, b, c] of data) {
    if(find(a) === find(b)) continue;
    union(a, b);
    max = c;
    if(find(f1) === find(f2)) return max;
  }
}