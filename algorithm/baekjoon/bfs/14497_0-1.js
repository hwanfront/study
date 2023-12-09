// https://www.acmicpc.net/problem/14497
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const PriorityQueue = require("./util/PriorityQueue");
const input = `3 3
2 2 1 1
#00
0*0
000`;
const [nm, se, ...data] = input.split`\n`;
console.log(solution(nm.split` `.map(Number), se.split` `.map(e => e - 1), data.map(e => e.split``)));

function solution([n, m], [sy, sx, ey, ex], data) {
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const check = (y, x) => 0 <= y && y < n && 0 <= x && x < m;
  const bfs = () => {
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    let queue0 = [];
    let queue1 = [];
    queue0.push([sy, sx, 0]);
    visited[sy][sx] = true;
    while(queue0.length > 0 || queue1.length > 0) {
      if(queue0.length > 0) {
        const [y, x, cnt] = queue0.pop();
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] === '#') return cnt + 1;
          visited[ny][nx] = true;
          if(data[ny][nx] === '0') queue0.push([ny, nx, cnt]);
          else queue1.push([ny, nx, cnt + 1]);
        }
      } else {
        const [y, x, cnt] = queue1.shift();
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(data[ny][nx] === '#') return cnt + 1;
          visited[ny][nx] = true;
          if(data[ny][nx] === '0') queue0.push([ny, nx, cnt]);
          else queue1.push([ny, nx, cnt + 1]);
        }
      }
    }
  } 
  return bfs();
}
