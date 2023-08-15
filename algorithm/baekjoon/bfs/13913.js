// https://www.acmicpc.net/problem/13913
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 17`;
const [N, K] = input.split(' ').map(Number);
console.log(solution(N, K));

function solution (N, K) {

  const bfs = () => {
    const visited = Array(110000).fill(false);
    let queue = [[N, `${N}`]];
    visited[N] = true;

    while(queue.length > 0) {
      const nextQueue = [];
      for(let i = 0; i < queue.length; i++) {
        const [num, str] = queue[i];
        if(num === K) return str;
        if(!visited[num * 2] && 0 <= num * 2 && num * 2 < 200001) {
          visited[num * 2] = 1;
          nextQueue.push([num * 2, `${str} ${num * 2}`]);
        }
        if(!visited[num - 1] && 0 <= num - 1 && num - 1 < 200001) {
          visited[num - 1] = 1;
          nextQueue.push([num - 1, `${str} ${num - 1}`]);
        }
        if(!visited[num + 1] && 0 <= num + 1 && num + 1 < 200001) {
          visited[num + 1] = 1;
          nextQueue.push([num + 1, `${str} ${num + 1}`]);
        }

      }
      queue = nextQueue;
    }
  }
  const result = bfs();
  return `${result.split(' ').length - 1}\n${result}`;
}