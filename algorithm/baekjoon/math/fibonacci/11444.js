// https://www.acmicpc.net/problem/11444
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1000000000000000000`;
const NUM = BigInt('1000000007');
console.log(solution(BigInt(input)));

function solution(n) {
  const map = new Map();
  map.set(BigInt(0), BigInt(0));
  map.set(BigInt(1), BigInt(1));

  const fibo = (n) => {
    if(map.has(n)) return map.get(n);
    const num = n / BigInt('2');
    if(n % BigInt('2') === BigInt('0')) {
      const f = fibo(num);
      const f1 = fibo(num - BigInt(1));
      map.set(n, (f * (f + BigInt('2') * f1)) % NUM);
    } else {
      const f = fibo(num);
      const f1 = fibo(num + BigInt(1))
      map.set(n, (f * f + f1 * f1) % NUM)
    }
    return map.get(n);
  }

  return Number(fibo(n));
}
