// https://www.acmicpc.net/problem/7569
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [MNH, ...arr] = input.split('\n');
console.log(solution(MNH.split(' ').map(Number), arr.map(e => e.split(' '))));

function solution([M, N, H], data) {
  const direction1 = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  const direction2 = [[-N, 0], [N, 0]];
  let result = 0;
  let currCnt;
  let cnt = 0;
  let queue = [];

  data.forEach((e, x) => {
    e.forEach((el, y) => {
      if(el === '1') {
        cnt++;
        queue.push([x, y]);
      }
    })
  })

  const bfs = () => {
    while(queue.length) {
      const size = queue.length;
      const nextQueue = [];
      currCnt = cnt;
      for(let i = 0; i < size; i++) {
        const [x, y] = queue[i];
        for(const dir of direction1) {
          const dx = x + dir[0];
          const dy = y + dir[1];
          if(Math.floor(x / N) * N <= dx && dx < Math.floor(x / N + 1) * N && 0 <= dy && dy < M) {
            if(data[dx][dy] === '0') {
              data[dx][dy] = '1';
              cnt++;
              nextQueue.push([dx, dy]);
            }
          }
        }
        for(const dir of direction2) {
          const dx = x + dir[0];
          const dy = y + dir[1];
          if(0 <= dx && dx < N * H && 0 <= dy && dy < M) {
            if(data[dx][dy] === '0') {
              data[dx][dy] = '1';
              cnt++;
              nextQueue.push([dx, dy]);
            }
          }
        }
      }

      if(currCnt === cnt) break;
      result++;
      queue = nextQueue;
    }


  }

  bfs();

  for(const line of data) {
    for(const point of line) {
      if(point === '0') {
        return -1;
      }
    }
  }

  return result;
}
