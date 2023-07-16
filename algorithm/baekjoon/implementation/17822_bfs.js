// https://www.acmicpc.net/problem/17822
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 6 3
1 2 3 4 5 6
2 3 4 5 6 7
3 4 5 6 7 8
4 5 6 7 8 9
2 1 4
3 0 1
2 1 2`;
const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const [NMT, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMT, data));

function solution ([N, M, T], data) {
  const circles = [Array(M + 1).fill(0)];

  for(let i = 0; i < N; i++) {
    circles.push([0].concat(data[i]));
  }

  const checkY = (y) => 0 < y && y <= N;

  const spin = (circle, d, k) => {
    if(d === 0) {
      return [0].concat(circle.slice(M - k + 1)).concat(circle.slice(1, M - k + 1));
    }
    return [0].concat(circle.slice(k + 1)).concat(circle.slice(1, k + 1));
  }

  const clearAdjacent = (pos, visited) => {
    const [iy, ix] = pos;
    let queue = [];
    let isCleared = false;
    let num = circles[iy][ix];
    visited[iy][ix] = true;

    if(num === 0) return false;

    for(const [dy, dx] of direction) {
      let ny = dy + iy;
      let nx = dx + ix;
      if(!checkY(ny)) continue;
      if(nx === 0) nx = M;
      if(nx === M + 1) nx = 1;
      if(visited[ny][nx]) continue;
      if(circles[ny][nx] !== num) continue;
      circles[iy][ix] = 0;
      circles[ny][nx] = 0;
      visited[ny][nx] = true;
      queue.push([ny, nx]);
      isCleared = true;
    }

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        for(const [dy, dx] of direction) {
          let ny = dy + y;
          let nx = dx + x;
          if(!checkY(ny)) continue;
          if(nx === 0) nx = M;
          if(nx === M + 1) nx = 1;
          if(visited[ny][nx]) continue;      
          if(circles[ny][nx] !== num) continue;
          circles[ny][nx] = 0;
          visited[ny][nx] = true;
          nextQueue.push([ny, nx]);
        }
      }
      queue = nextQueue;
    }

    return isCleared;
  }

  const getSum = () => {
    let sum = 0;
    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= M; j++) {
        if(circles[i][j] === 0) continue;
        sum += circles[i][j];
      }
    }
    return sum;
  }

  const getSumAndTargetPos = () => {
    let sum = 0;
    const array = [];
    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= M; j++) {
        if(circles[i][j] === 0) continue;
        sum += circles[i][j];
        array.push([i, j]);
      }
    }
    return [sum, array];
  }

  const divide = (avg, array) => {
    for(const [i, j] of array) {
      if((circles[i][j]) > avg) {
        circles[i][j] -= 1;
      } else if ((circles[i][j]) < avg) {
        circles[i][j] += 1;
      }
    }
  }
  
  for(let i = N; i < data.length; i++) {
    const [x, d, k] = data[i]; // x => 원판 배수, d => 0 시계 1 반시계, k => 회전 수

    for(let j = x; j <= N; j += x) {
      circles[j] = spin(circles[j], d, k);
    }

    let isCleared = false;
    const visited = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

    for(let j = 1; j <= N; j++) {
      for(let k = 1; k <= M; k++) {
        if(clearAdjacent([j, k], visited)) {
          isCleared = true;
        }
      }
    }

    if(!isCleared) {
      const [sum, array] = getSumAndTargetPos();
      divide(sum / array.length, array);
    }
  }

  return getSum();
}