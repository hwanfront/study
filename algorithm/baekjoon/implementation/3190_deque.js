// https://www.acmicpc.net/problem/3190
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `6
3
3 4
2 5
5 3
3
3 D
15 L
17 D`;
const direction = [[-1, 0],[0, 1],[1, 0],[0, -1]];
const [N, K, ...data] = input.split('\n');

console.log(solution(+N, +K, data));

function solution (N, K, data) {
  const map = Array.from({length: N}, () => Array(N).fill(0));
  const t = new Map();
  let i = 0
  for(; i < K; i++) {
    const [x, y] = data[i].split(' ').map(Number);
    map[x - 1][y - 1] = 2;
  }
  const L = +data[i++];
  for(; i < K + L + 1; i++) {
    const [x, c] = data[i].split(' ');
    t.set(+x, c);
  }

  let snake = [[0, 0]];
  let d = 1;
  
  map[0][0] = 1;

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;

  const checkFront = (h) => {
    const [y, x] = h;
    if(!check(y, x)) return false;
    if(map[y][x] === 1) return false;
    return true; // 게임 계속
  }
  
  const movehead = (h, d) => {
    const [y, x] = h;
    const [dy, dx] = d;
    const ny = y + dy;
    const nx = x + dx;
    snake.push([ny, nx]);
  }

  const isApple = (h) => {
    const [y, x] = h;
    return map[y][x] === 2;
  }

  const eat = (h) => {
    const [y, x] = h;
    map[y][x] = 1;
  }

  const move = (h, t) => {
    const [hy, hx] = h;
    const [ty, tx] = t;
    map[hy][hx] = 1;
    map[ty][tx] = 0;
  }

  const turn = (to) => {
    if(to === 'L') {
      return d === 0 ? 3 : d - 1;
    }
    return d === 3 ? 0 : d + 1;
  }

  let cnt = 0

  while(1) {
    cnt++;
    movehead(snake[snake.length - 1], direction[d]);
    if(!checkFront(snake[snake.length - 1])) {
      break;
    }

    if(isApple(snake[snake.length - 1])) {
      eat(snake[snake.length - 1])
    } else {
      move(snake[snake.length - 1], snake.shift());
    }

    if(t.has(cnt)) {
      d = turn(t.get(cnt));
    }
  }

  return cnt;
}