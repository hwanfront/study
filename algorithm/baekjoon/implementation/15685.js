// https://www.acmicpc.net/problem/15685
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3
3 3 0 1
4 2 1 3
4 2 2 1`;
const direction = [[0, 1],[-1, 0],[0, -1],[1, 0]];
const [N, ...data] = input.split('\n');
console.log(solution(+N, data.map(e => e.split(' ').map(Number))));

function solution (N, data) {
  let result = 0;
  const visited = Array.from({ length: 101 }, () => Array(101).fill(false));

  const getDragonCurve = ([y, x], d, g) => {
    const stack = [d];
    let [dy, dx] = direction[d];
    let ex = x + dx;
    let ey = y + dy;
    visited[ey][ex] = true;
    for(let i = 0; i < g; i++) {
      const size = stack.length;
      for(let j = size - 1; j >= 0; j--) {
        const newD = (stack[j] + 1) % 4;
        [dy, dx] = direction[newD];
        ey += dy;
        ex += dx;
        visited[ey][ex] = true;
        stack.push(newD);
      }
    }
  }
  
  for(const [x, y, d, g] of data) {
    visited[y][x] = true;
    getDragonCurve([y, x], d, g);
  }

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      if(!visited[i][j] || !visited[i + 1][j] || !visited[i][j + 1] || !visited[i + 1][j + 1]) continue;
      result++;
    }
  }

  return result;
}
