// https://www.acmicpc.net/problem/17244
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `7 6
#######
#SX..X#
#..####
#..X..#
#...X.#
#####E#`;
const [NM, ...house] = input.split('\n');
let itemCnt = 0;
let s;
console.log(solution(NM.split(' ').map(Number), house.map((e, i) => e.split('').map((el, j) => {
  if(el === 'X') {
    return itemCnt++;
  }
  if(el === 'S') {
    s = [i, j];
    return '.'
  }
  return el;
}))));

function solution ([N, M], house) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  const check = (y, x) => 0 <= y && y < M && 0 <= x && x < N;
  const bfs = () => {
    const visited = Array.from({length: M}, () => Array.from({length: N}, () => Array(1 << itemCnt)));
    let queue = [[s[0], s[1], 0, 0]];
    visited[s[0]][s[1]][0] = true;

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x, b, cnt] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(visited[ny][nx][b]) continue;
          if(house[ny][nx] === '#') continue;
          if(house[ny][nx] === 'E') {
            if(b === ((1 << itemCnt) - 1)) {
              return cnt + 1;
            }
            continue;
          }
          if(house[ny][nx] === '.') {
            visited[ny][nx][b] = true;
            nextQueue.push([ny, nx, b, cnt + 1]);
          } else {
            if(b & (1 << house[ny][nx]))  {
              visited[ny][nx][b] = true;
              nextQueue.push([ny, nx, b, cnt + 1]);
            } else {
              visited[ny][nx][b + 1 << house[ny][nx]] = true;
              nextQueue.push([ny, nx, b + (1 << house[ny][nx]), cnt + 1]);
            }
          }
        }
      }
      queue = nextQueue;
    }
  } 
  return bfs();
}
