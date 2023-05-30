// https://www.acmicpc.net/problem/13549
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 0`;
const [N, K] = input.split(' ').map(Number);

console.log(solution(N, K));

function solution(N, K) {
  const bfs = () => {
    const deque = [];
    const visited = Array(101000).fill(false);
    visited[N] = true;
    deque.push([N, 0]);

    while(deque.length > 0) {
      const [cur, cnt] = deque.shift();
      if(cur === K) {
        return cnt;
      }
      if(!visited[cur * 2] && 0 <= cur * 2 && cur * 2 < 200001) {
        visited[cur * 2] = 1;
        deque.unshift([cur * 2, cnt]);
      }
      if(!visited[cur - 1] && 0 <= cur - 1 && cur - 1 < 200001) {
        visited[cur - 1] = 1;
        deque.push([cur - 1, cnt + 1]);
      }
      if(!visited[cur + 1] && 0 <= cur + 1 && cur + 1 < 200001) {
        visited[cur + 1] = 1;
        deque.push([cur + 1, cnt + 1]);
      }
    }
  }

  return bfs();
}
