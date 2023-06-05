// https://www.acmicpc.net/problem/1261
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `3 3
011
111
110`;
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
const check = (x, y, N, M) => 0 <= x && x < N && 0 <= y && y < M;
const [NM, ...data] = input.split('\n');
console.log(solution(data));

function solution (data) {
  const visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
  const bfs = () => {
    const deque = [[0, 0, 0]];
    visited[0][0] = true;
    while(deque.length > 0) {
      const [x, y, cnt] = deque.shift();
      if(x === data.length - 1 && y === data[0].length - 1) {
        return cnt;
      }
      for(const [dx, dy] of direction) {
        const nx = dx + x;
        const ny = dy + y;
        if(!check(nx, ny, data.length, data[0].length)) continue;
        if(visited[nx][ny]) continue;
        visited[nx][ny] = true;
        if(data[nx][ny] === '0') {
          deque.unshift([nx, ny, cnt]);
        } else {
          deque.push([nx, ny, cnt + 1]);
        }
      }
    }
  }

  return bfs();
}