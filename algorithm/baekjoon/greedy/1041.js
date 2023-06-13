// https://www.acmicpc.net/problem/1041
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString();
const input = `1
1 2 3 4 5 6`;
const [N, sides] = input.split('\n');
console.log(solution(Number(N), sides.split(' ').map(Number)));

function solution(N, numbers) {
  // 꼭짓점 = 4
  // 모서리 = (N - 2) * 8 + 4
  // 전체 = 4 * N * (N - 1) + (N - 2) * (N - 2)
  // 면 = 전체 - 꼭짓점 - 모서리

  const us2 = new Map([[0, 5], [1, 4], [2, 3], [5, 0], [4, 1], [3, 2]]);
  const s3 = [[0, 1, 2], [0, 2, 4], [0, 4, 3], [0, 3, 1], [5, 1, 2], [5, 2, 4], [5, 4, 3], [5, 3, 1]];
  const s2 = [];
  for(let i = 0; i < 6; i++) {
    for(let j = i; j < 6; j++) {
      if(i === j || us2.get(i) === j) {
        continue;
      }
      s2.push([i, j]);
    }
  }
  

  const a = 4;
  const b = (N - 2) * 8 + 4;
  const all = 4 * N * (N - 1) + (N - 2) * (N - 2);
  const c = all - a - b;

  const m1 = Math.min(...numbers);
  const m2 = Math.min(...s2.map(([e1, e2]) => numbers[e1] + numbers[e2]));
  const m3 = Math.min(...s3.map(([e1, e2, e3]) => numbers[e1] + numbers[e2] + numbers[e3]));
  if(N === 1) {
    return m1 * 5;
  }

  return c * m1 + b * m2 + a * m3;
}
