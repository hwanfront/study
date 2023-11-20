// https://www.acmicpc.net/problem/11066
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `2
4
40 30 30 50
15
1 21 3 4 5 35 5 4 3 5 98 21 14 17 32`;
const [t, ...data] = input.split`\n`;
const result = [];
let j = 0;
for(let i = 0; i < +t; i++) {
  const k = +data[j++];
  const files = data[j++].split` `.map(Number);
  result.push(solution(k, files));
}

console.log(result.join('\n'));

function solution(k, files) {
  const dp = Array.from({length: k}, () => Array(k).fill(0));
  const sum = Array(k + 1).fill(0);

  for(let i = 0; i < k; i++) {
    sum[i + 1] = sum[i] + files[i];
  }

  for(let size = 1; size <= k; size++) {
    for(let s = 0; s + size < k; s++) {
      const e = s + size;
      dp[s][e] = Number.MAX_SAFE_INTEGER;
      for(let mid = s; mid < e; mid++) {
        dp[s][e] = Math.min(
          dp[s][e], 
          dp[s][mid] + dp[mid + 1][e] + (sum[e + 1] - sum[s]));
      }
    }
  }

  return dp[0][k - 1];
}