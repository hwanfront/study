// https://www.acmicpc.net/problem/11758
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 1
7 3
5 5`;
const [[x1, y1], [x2, y2], [x3, y3]] = input.split('\n').map(e => e.split(' ').map(Number));

console.log(solution(x1, y1, x2, y2, x3, y3));

function solution (x1, y1, x2, y2, x3, y3) {
  const CCW = (x1, y1, x2, y2, x3, y3) => {
    const tmp = x2*y3 - x2*y1 - x1*y3 + x1*y1 - (y2*x3 - y1*x3 - y2*x1 + x1*y1);
    if(tmp > 0) {
      return 1;
    }
    if(tmp < 0) {
      return -1;
    }
    return 0;
  }
  return CCW(x1, y1, x2, y2, x3, y3);
}