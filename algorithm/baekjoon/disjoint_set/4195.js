// https://www.acmicpc.net/problem/4195
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `1
5
a b
c d
a c
b e
d f`;
const [t, ...data] = input.split('\n');
const result = [];
let j = 0;
for(let i = 0; i < +t; i++) {
  const f = +data[j++];
  const r = data.slice(j, j + f).map(e => e.split(' '));
  j += f;
  solution(f, r);
}
console.log(result.join('\n'));

function solution (f, r) {
  const map = new Map();
  const parent = [0]
  const cnt = [0];

  const find = (x) => {
    if(x === parent[x]) return x;
    return parent[x] = find(parent[x]);
  }

  const union = (x, y) => {
    const s1 = find(x);
    const s2 = find(y);
    if(s1 !== s2) {
      cnt[s1] += cnt[s2];
      parent[s2] = s1;
    }
    return cnt[s1];
  }

  let j = 1;
  for(let i = 0; i < f; i++) {
    const [f1, f2] = r[i];
    if(!map.has(f1)) {
      map.set(f1, j);
      parent.push(j++);
      cnt.push(1);
    }
    if(!map.has(f2)) {
      map.set(f2, j);
      parent.push(j++);
      cnt.push(1);
    }
    
    result.push(union(map.get(f1), map.get(f2)));
  }
}