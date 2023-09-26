// https://www.acmicpc.net/problem/10986
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5 3
1 2 3 1 2`;
const [nm, data] = input.split('\n');
const [n, m] = nm.split(' ');
console.log(solution([+n, BigInt(m)], data.split(' ').map(BigInt)));

function solution ([n, m], data) {
  let result = 0;
  const pSum = Array(n).fill(0);
  const cnt = Array(Number(m)).fill(0);
  pSum[0] = data[0];
  for(let i = 1; i < n; i++) {
    pSum[i] = pSum[i - 1] + data[i];
    cnt[Number(pSum[i - 1] % m)]++;
  }
  cnt[Number(pSum[n - 1] % m)]++;
  
  result += cnt[0];

  for(let i = 0; i < m; i++) {
    if(cnt[i] === 0) continue;
    result += cnt[i] * (cnt[i] - 1) / 2;
  }
  return result;
}