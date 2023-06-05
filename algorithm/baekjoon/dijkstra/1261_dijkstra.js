const PriorityQueue = require('../util/PriorityQueue');
// https://www.acmicpc.net/problem/1261

// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6 6
001111
010000
001111
110001
011010
100010`;
const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
const check = (x, y, N, M) => 0 <= x && x < N && 0 <= y && y < M;
const [NM, ...data] = input.split('\n');
console.log(solution(data));

function solution (data) {
  const visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
  const dijkstra = () => {
    const pq = new PriorityQueue((a, b) => a[0] < b[0]);
    pq.push([0, [0, 0]])
    visited[0][0] = true;
    while(!pq.empty()) {
      const [cost, [x, y]] = pq.top();
      pq.pop();
      if(x === data.length - 1 && y === data[0].length - 1) return cost;
      for(const [dx, dy] of direction) {
        const nx = dx + x;
        const ny = dy + y;
        if(!check(nx, ny, data.length, data[0].length)) continue;
        if(visited[nx][ny]) continue;
        visited[nx][ny] = true;
        const nextCost = data[nx][ny] === '1' ? 1 + cost : cost;
        pq.push([nextCost, [nx, ny]])
      }
    }
  }

  return dijkstra();
}