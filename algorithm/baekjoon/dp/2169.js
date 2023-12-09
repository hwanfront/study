// https://www.acmicpc.net/problem/2169
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `5 5
10 25 7 8 13
68 24 -78 63 32
12 -69 100 -29 -25
-16 -22 -57 -33 99
7 -76 -11 77 15`;
const [nm, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, data));

function solution([n, m], data) {
  const dp = Array.from({length: n}, () => Array(m).fill(0));
  dp[0][0] = data[0][0];
  for(let x = 1; x < m; x++) {
    dp[0][x] = dp[0][x - 1] + data[0][x];
  }

  for(let y = 1; y < n; y++) {
    const rl = Array(m).fill(0);
    dp[y][0] = dp[y - 1][0] + data[y][0];
    rl[m - 1] = dp[y - 1][m - 1] + data[y][m - 1];
    for(let x = 1; x < m; x++) {
      dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]) + data[y][x];
    }
    if(y === n - 1) break;
    for(let x = m - 2; x >= 0; x--) {
      rl[x] = Math.max(dp[y - 1][x], rl[x + 1]) + data[y][x];
      dp[y][x] = Math.max(rl[x], dp[y][x]);
    }
  }

  return dp[n - 1][m - 1];
}

/**
 * 10 35 42 50 63
 * 172 104 80 158 145
 * 184 160 229 186 161
 * 168 150 172 227 260
 * 
 * 78 102 24 113 145
 * 172 104 80 158 95
 * 
 * 184 115 215 186 161
 * 184 160 229 129 120
 * 
 * 168 146 172 153 260
 * 168 150 172 227 260
 * 
 * 175 99 161 304 319
 * 272 265 341 352 275
 */