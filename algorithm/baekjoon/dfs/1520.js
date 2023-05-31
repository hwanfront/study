// https://www.acmicpc.net/problem/1520
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4 5
50 45 37 32 30
35 50 40 20 25
30 30 25 17 28
27 24 22 15 10`;
const [MN, ...arr] = input.split('\n');
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
console.log(solution(MN.split(' ').map(Number), arr.map(e => e.split(' ').map(Number))));

function solution([M, N], arr) {
  const visited = [];
  const check = (x, y) => 0 <= x && x < M && 0 <= y && y < N;
  for(let i = 0; i < M; i++) {
    visited.push(Array(N).fill(-1));
  }

  const dfs = (x, y) => {
    if(visited[x][y] !== -1) {
      return visited[x][y];
    }
    let cnt = 0;
    for(const [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;
      if(!check(nx, ny)) continue;
      if(arr[x][y] > arr[nx][ny]) {
        cnt += dfs(nx, ny);
      }
    }
    visited[x][y] = cnt;
    return cnt;
  }
  visited[M - 1][N - 1] = 1;
  return dfs(0, 0);
}

function solution1([M, N], arr) { // 시간초과
  let result = 0;
  const visited = [];
  const check = (x, y) => 0 <= x && x < M && 0 <= y && y < N;
  for(let i = 0; i < M; i++) {
    visited.push(Array(N).fill(false));
  }

  visited[0][0] = true;

  const dfs = (x, y) => {
    if(x === M - 1 && y === N - 1) {
      result++;
      return;
    }
    for(const [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;
      if(!check(nx, ny)) continue;
      if(visited[nx][ny]) continue;
      if(arr[x][y] > arr[nx][ny]) {
        visited[nx][ny] = true;
        dfs(nx, ny);
        visited[nx][ny] = false;
      }
    }
  }
  dfs(0, 0);
  return result;
}