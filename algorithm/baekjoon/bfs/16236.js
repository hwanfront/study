// https://www.acmicpc.net/problem/16236

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [sN, ...arr] = input.split('\n');
const N = Number(sN);
const direction = [[-1, 0],[1, 0],[0, -1],[0, 1]];
const check = (x, y) => 0 <= x && x < N && 0 <= y && y < N;

let sharkPos = [-1, -1];
let sharkSize = 2;
let eat = 0;

const numbers = arr.map((line, x) => line.split(' ').map((number, y) => {
  if(number === '9') {
    sharkPos = [x, y];
    return Number(0);
  }
  return Number(number);
}));

console.log(solution(numbers));

function solution (numbers) {
  let result = 0;

  const bfs = () => {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let queue = [[sharkPos[0], sharkPos[1], 0]];
    visited[sharkPos[0]][sharkPos[1]] = true;
    while(queue.length > 0) {
      const nextQueue = [];
      const size = queue.length;
      for(let i = 0; i < size; i++) {
        const [x, y, cnt] = queue[i];
        if(numbers[x][y] !== 0 && numbers[x][y] < sharkSize) {
          numbers[x][y] = 0;
          sharkPos = [x, y];
          eat += 1;
          if(eat === sharkSize) {
            eat = 0;
            sharkSize += 1;
          }
          return cnt;
        };
        for(const [dx, dy] of direction) {
          const nx = dx + x;
          const ny = dy + y;
          if(!check(nx, ny)) continue;
          if(visited[nx][ny]) continue;
          if(numbers[nx][ny] > sharkSize) continue;
          visited[nx][ny] = true;
          nextQueue.push([nx, ny, cnt + 1]);
        }
      }
      queue = nextQueue.sort((a, b) => {
        if(b[0] === a[0]) return a[1] - b[1];
        return a[0] - b[0];
      });
    }
    return -1;
  }
  while(1) {
    const move = bfs();
    if(move === -1) break;
    result += move;
  }

  return result;
}