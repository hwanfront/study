// https://www.acmicpc.net/problem/9527
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `2 12`;
const [a, b] = input.split` `.map(BigInt);
console.log(solution(a, b));

function solution(a, b) {
  const dp = [];
  dp.push(1n);

  for(let i = 1; i < 54; i++) {
    const idx = BigInt(i);
    dp.push(dp[idx - 1n] * 2n + (1n << idx));
  }
  
  const sum = (num) => {
    let result = num & 1n;
    for(let i = dp.length - 1; i > 0; i--) {
      const idx = BigInt(i);
      if((num & (1n << idx)) === 0n) continue;
      result += dp[i - 1] + num - (1n << idx) + 1n;
      num -= (1n << idx);
    }
    return result;
  }
  return (sum(b) - sum(a - 1n)).toString();
}
// 0 1
// 1 2 + (1)
// 2 4 + (2 + 1)
// 3 8 + (4 + 2 + 1)
// 4 16 + (8 + 4 + 2 + 1)

// 0 1
// 1 dp[0] + (2 + dp[0])
// 2 dp[1] + (4 + dp[1])
// 3 dp[2] + (8 + dp[2])
// dp[n] = dp[n - 1] + ((2 ** n) + dp[n - 1])