// https://www.acmicpc.net/problem/1697
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `1 0`;
const [N, K] = input.split(' ').map(Number);

console.log(solution(N, K));

function solution(N, K) {
  let result = 0;

  const bfs = () => {
    let queue = [[N, 0]];
    const visited = Array(101000).fill(false);
    visited[N] = true;
    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [num, cnt] = queue.pop();
        if(num === K) {
          result = cnt;
          return;
        }
        if(num < 0) continue;
        if(num > 100000) continue;
        if(!visited[num - 1]) {
          visited[num - 1] = true;
          nextQueue.push([num - 1, cnt + 1]);
        }
        if(!visited[num + 1]) {
          visited[num + 1] = true;
          nextQueue.push([num + 1, cnt + 1]);
        }
        if(!visited[num * 2]) {
          visited[num * 2] = true;
          nextQueue.push([num * 2, cnt + 1]);
        }
        
      }
      queue = nextQueue;
    }
  }

  bfs();

  return result;
}
