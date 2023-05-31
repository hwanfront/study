// https://www.acmicpc.net/problem/16234
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4 10 50
10 100 20 90
80 100 60 70
70 20 30 40
50 20 100 10`;
const [NLR, ...arr] = input.split('\n');
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
console.log(solution(NLR.split(' ').map(Number), arr.map(e => e.split(' ').map(Number))));

function solution([N, L, R], arr) {
  let result = 0;
  let check = false;
  const visited = [];
  for(let i = 0; i < N; i++) {
    visited.push(Array(N).fill(false));
  }

  const bfs = (fx, fy) => {
    const union = [[fx, fy]];
    let sum = arr[fx][fy];
    let queue = [[fx, fy]];
    visited[fx][fy] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [x, y] = queue.pop();
        for(const [dx, dy] of direction) {
          const nx = x + dx;
          const ny = y + dy;
          if(nx < 0 || N <= nx || ny < 0 || N <= ny) continue;
          if(visited[nx][ny]) continue;
          const abs = Math.abs(arr[x][y] - arr[nx][ny]);

          if(L <= abs && abs <= R) {
            visited[nx][ny] = true;
            union.push([nx, ny]);
            sum += arr[nx][ny];
            nextQueue.push([nx, ny]);
          }
        }
      }
      queue = nextQueue;
    }

    if(union.length > 1) {
      check = false;
      for(const [nx, ny] of union) {
        arr[nx][ny] = Math.floor(sum / union.length);
      }
    } else {
      visited[fx][fy] = false;
    }
  }

  while(!check) {
    result++;
    check = true;
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        visited[i][j] = false;
      }
    }
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        if(!visited[i][j]) {
          bfs(i, j);
        }
      }
    }
  }

  return result - 1;
}