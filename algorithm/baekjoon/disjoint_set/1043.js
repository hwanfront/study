// https://www.acmicpc.net/problem/1043
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `10 10 
1 1 
2 10 1
2 9 2
2 8 3
2 7 4
2 6 5
2 5 7 
2 4 8
2 3 9 
2 2 10 
1 1`;
const [nm, o, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, o, data));

function solution([n, m], o, data) {
  const parent = Array.from({length: n + 1}, (_, i) => i);
  let result = 0;

  for(let i = 1; i < o.length; i++) {
    parent[o[i]] = 0;
  }

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

  for(const p of data) {
    for(let i = 2; i < p.length; i++) {
      union(p[1], p[i]);
    }
  }
  
  for(const p of data) {
    let is = false;
    for(let i = 1; i < p.length; i++) {
      if(is) break;
      if(find(parent[p[i]]) === 0) is = true;
    }
    if(!is) result++;
  }

  return result;
}