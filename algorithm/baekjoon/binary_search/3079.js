// https://www.acmicpc.net/problem/
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `100000 1000000000
1
1`;
const [NM, ...data] = input.split`\n`;
console.log(solution(NM.split` `.map(BigInt), data.map(BigInt)));

function solution([N, M], data) {
  const map = new Map();
  let max = 0n;

  data.forEach(e => {
    max = max < e ? e : max;
    if(!map.has(e)) map.set(e, 1n);
    else map.set(e, map.get(e) + 1n);
  });

  const bs = (s, e, t) => {
    while(s < e) {
      const mid = BigInt((s + e) / 2n);
      let sum = 0n;
      map.forEach((v, k) => sum += BigInt(mid / k) * v);
      if(sum < t) s = mid + 1n; 
      else e = mid;
    }
    return s;
  }

  return bs(0n, max * M, M).toString();
}