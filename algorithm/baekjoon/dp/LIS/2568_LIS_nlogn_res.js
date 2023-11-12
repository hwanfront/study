// https://www.acmicpc.net/problem/2568
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

// const input = `8
// 1 8
// 3 9
// 2 2
// 4 1
// 6 4
// 10 10
// 9 7
// 7 6`;

// const input = `12
// 1 1
// 2 5
// 3 4
// 4 2
// 5 3
// 6 8
// 7 6
// 8 7
// 9 9
// 10 3
// 11 4
// 12 5`;

const input = `9
1 50000
2 4
3 11
4 12
5 6
6 3
7 2
8 9
9 10`;

const [n, ...abs] = input.split`\n`;
console.log(solution(+n, abs.map(e => e.split` `.map(Number))));

function solution(n, abs) {
  abs.sort((a, b) => a[0] - b[0]);
  
  const bs = (arr, s, e, tg) => {
    while(s < e) {
      const mid = Math.floor((s + e) / 2);
      if(tg > arr[mid]) s = mid + 1;
      else e = mid;
    }
    return e;
  }

  const dp = [];
  const idp = [];
  dp.push(abs[0][1]);
  idp.push(0);

  for(let i = 1; i < n; i++) {
    const now = abs[i][1];
    if(dp.at(-1) < now) {
      dp.push(now);
      idp.push(dp.length - 1);
    }
    else {
      const idx = bs(dp, 0, dp.length - 1, now);
      dp[idx] = now;
      idp.push(idx);
    }
  }

  let j = dp.length - 1;
  const result = [];
  for(let i = idp.length - 1; i >= 0; i--) {
    if (j === idp[i]) j -= 1;
    else result.push(abs[i][0]);
  }

  return result.length + '\n' + result.sort((a, b) => a - b).join`\n`;
}
