// https://www.acmicpc.net/problem/23288
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 5 1000
4 1 2 3 3
6 1 1 3 3
5 6 1 3 2
5 5 6 5 5`;

class Dice {
  constructor() {
    this.numbers = [1,2,3,4,5,6];
  }

  roll(d) {
    const [d1, d2, d3, d4, d5, d6] = this.numbers;
    switch (d) {
    case 0: // 남
      this.numbers = [d2, d6, d3, d4, d1, d5];
      break;
    case 1: // 서
      this.numbers = [d3, d2, d6, d1, d5, d4];
      break;
    case 2: // 북
      this.numbers = [d5, d1, d3, d4, d6, d2];
      break;
    case 3: // 동
      this.numbers = [d4, d2, d1, d6, d5, d3];
      break;
    }
  }

  getTop() {
    return this.numbers[0];
  }

  getBottom() {
    return this.numbers[this.numbers.length - 1];
  }

}

const [NMK, ...grid] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMK, grid));

function solution ([N, M, K], grid) {
  const direction = [[1, 0],[0, -1],[-1, 0],[0, 1]];
  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < M;
  const getDirection = (diceDirection) => (4 + diceDirection) % 4;

  const move = (dd, [y, x]) => {
    let d = getDirection(dd);
    let [dy, dx] = direction[d];
    let [ny, nx] = [dy + y, dx + x];
    if(!check(ny, nx)) {
      d = getDirection(dd + 2);
      [dy, dx] = direction[d];
      [ny, nx] = [dy + y, dx + x];
    }
    return [d, [ny, nx]];
  }
  
  const bfs = ([iy, ix]) => {
    const point = grid[iy][ix];
    let result = [[iy, ix]];

    const visited = Array.from({length: N}, () => Array(M).fill(false));
    let queue = [[iy, ix]]
    visited[iy][ix] = true;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(grid[ny][nx] !== point) continue;
          visited[ny][nx] = true;
          result.push([ny, nx]);
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }

    return result;
  }

  let result = 0;
  let cnt = 0;
  let dd = 3;
  let pos = [0, 0];
  const dice = new Dice();
  const points = Array.from({length: N}, () => Array(M).fill(0));
  
  while(cnt++ !== K) {
    const [ndd, npos] = move(dd, pos, dice);
    dd = ndd;
    pos = npos;
    dice.roll(getDirection(dd));
    if(points[pos[0]][pos[1]] === 0) {
      const myPos = bfs(pos);
      for(const [py, px] of myPos) {
        points[py][px] = myPos.length;
      }
    }
    result += grid[pos[0]][pos[1]] * points[pos[0]][pos[1]];

    if(dice.getBottom() > grid[pos[0]][pos[1]]) dd += 1;
    if(dice.getBottom() < grid[pos[0]][pos[1]]) dd -= 1;
  }
  return result;
}