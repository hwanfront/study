// https://www.acmicpc.net/problem/7453
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `6
-45 22 42 -16
-41 -27 56 30
-36 53 -37 77
-36 30 -75 -46
26 -38 -10 62
-32 -54 -6 45`;
const [n, ...data] = input.split('\n');
console.log(solution(+n, data.map(e => e.split(' ').map(Number))));

function solution (n, data) {
  const map = new Map();
  let result = 0;
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      const sum = data[i][0] + data[j][1];
      if(!map.get(sum)) map.set(sum, 0);
      map.set(sum, map.get(sum) + 1);
    }
  }

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      const sum = data[i][2] + data[j][3];
      if(map.get(-sum)) {
        result += map.get(-sum);
      }
    }
  }
  return result;
}