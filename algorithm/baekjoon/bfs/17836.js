// https://www.acmicpc.net/problem/17836
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `6 6 9
0 0 0 0 1 1
0 0 0 0 0 2
1 1 1 0 1 0
0 0 0 0 0 0
0 1 1 1 1 1
0 0 0 0 0 0`;
const [nmt, ...data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nmt, data));

function solution([n, m, t], data) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
  const bfs = () => {
    let queue = [];
    let cnt = 0;
    const visited = Array.from({length: n}, () => Array.from({length: m}, () => [false, false]));
    if(data[0][0] === 2) {
      queue.push([0, 0, true]);
      visited[0][0][1] = true;
    } else {
      queue.push([0, 0, false]);
      visited[0][0][0] = true;
    }
    while(queue.length > 0) {
      const nextQueue = [];
      if(cnt > t) return 'Fail';
      for(const [y, x, is] of queue) {
        if(y === n - 1 && x === m - 1) return cnt;
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(is) {
            if(visited[ny][nx][1]) continue;
            visited[ny][nx][1] = true;
            nextQueue.push([ny, nx, true]);
          } else {
            if(visited[ny][nx][0]) continue;
            if(data[ny][nx] === 1) continue;
            visited[ny][nx][0] = true;
            if(data[ny][nx] === 2) {
              visited[ny][nx][1] = true;
              nextQueue.push([ny, nx, true]);
            } else {
              nextQueue.push([ny, nx, false]);
            }
          }
        }
      }
      queue = nextQueue;
      cnt++;
    }
    return 'Fail';
  }
  return bfs();
}
