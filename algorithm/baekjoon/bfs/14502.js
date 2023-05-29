// https://www.acmicpc.net/problem/14502
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `8 8
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0`;
const [NM, ...arr] = input.split('\n');
const [N, M] = NM.split(' ').map(Number);
const direction = [[0, 1],[-1, 0],[0, -1],[1, 0]];
const virus = [];
const data = arr.map((e, x) => e.split(' ').map((el, y) => {
  if(el === '2') virus.push([x, y]);
  return Number(el);
}));
const check = (x, y) => 0 <= x && x < N && 0 <= y && y < M;

console.log(solution(N, M, data));

function solution(N, M, arr) {
  let result = 0;

  const bfs = () => {
    let queue = JSON.parse(JSON.stringify(virus));
    const newArr = JSON.parse(JSON.stringify(arr));

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [x, y] = queue.pop();
        for(const [dx, dy] of direction) {
          const nx = x + dx;
          const ny = y + dy;
          if(check(nx, ny)) {
            if(newArr[nx][ny] === 0) {
              nextQueue.push([nx, ny]);
              newArr[nx][ny] = 2;
            }
          }
        }
      }
      queue = nextQueue;
    }
    
    let cnt = 0;

    for(let i = 0; i < N; i++) {
      for(let j = 0; j < M; j++) {
        if(newArr[i][j] === 0) {
          cnt++;
        }
      }
    }
    result = Math.max(result, cnt);
  }

  const dfs = (cnt) => {
    if(cnt === 3) {
      bfs();
      return;
    }
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < M; j++) {
        if(arr[i][j] === 0) {
          arr[i][j] = 1;
          dfs(cnt + 1);
          arr[i][j] = 0;
        }
      }
    }
  }

  dfs(0);
  return result;
}
