// https://www.acmicpc.net/problem/9461
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `3
6
12
100`;
const [t, ...data] = input.split('\n').map(Number);
console.log(solution(t, data));

function solution (t, numbers) {
  const dp = [0];
  dp.push(1);
  dp.push(1);
  dp.push(1);
  dp.push(2);
  dp.push(2);

  for(let i = 6; i < 101; i++) {
    dp.push(dp[i - 1] + dp[i - 5]);
  }
  
  return numbers.map(e => dp[e]).join('\n');
}