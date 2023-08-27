// https://www.acmicpc.net/problem/9328
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `1
2 2
$$
$$
0`;
const [tc, ...info] = input.split('\n');
const result = [];
let idx = 0;
for(let i = 0; i < +tc; i++) {
  const [h, v] = info[idx++].split(' ').map(Number);
  const bd = info.slice(idx, idx += h).map(e => e.split(''));
  const keys = info[idx++];
  result.push(solution(h, v, bd, new Set(keys === '0' ? [] : keys.split(''))));
}

console.log(result.join('\n'));

function solution (h, v, bd, keys) {
  const direction = [[0, 1],[1, 0],[0, -1],[-1, 0]];
  let result = 0;
  let queue = [];
  const doors = new Map();

  const check = (y, x) => 0 <= y && y < h && 0 <= x && x < v;
  const checkUpper = (ch) => 'A'.charCodeAt() <= ch.charCodeAt() && ch.charCodeAt() <= 'Z'.charCodeAt();
  const checkLower = (ch) => 'a'.charCodeAt() <= ch.charCodeAt() && ch.charCodeAt() <= 'z'.charCodeAt();

  const findSide = (y, x) => {
    if(bd[y][x] === '*') return;
    if(bd[y][x] === '.') {
      queue.push([y, x]);
      return;
    }
    if(bd[y][x] === '$') {
      queue.push([y, x]);
      bd[y][x] = '.';
      result += 1;
      return;
    }
    if(checkLower(bd[y][x])) {
      keys.add(bd[y][x]);
      bd[y][x] = '.';
      queue.push([y, x]);
      return;
    }
    if(checkUpper(bd[y][x])) {
      if(keys.has(bd[y][x].toLowerCase())) {
        bd[y][x] = '.';
        queue.push([y, x]);
      } else {
        if(!doors.has(bd[y][x])) {
          doors.set(bd[y][x], []);
        }
        doors.get(bd[y][x]).push([y, x]);
      }
    }
  }

  const bfs = () => {
    const visited = Array.from({length: h}, () => Array(v).fill(false));

    for(const [y, x] of queue) {
      visited[y][x] = true;
    }

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [y, x] of queue) {
        for(const [dy, dx] of direction) {
          const [ny, nx] = [dy + y, dx + x];
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(bd[ny][nx] === '*') continue;
          visited[ny][nx] = true;
          if(bd[ny][nx] === '.') {
            nextQueue.push([ny, nx]);
            continue;
          }
          if(bd[ny][nx] === '$') {
            nextQueue.push([ny, nx]);
            bd[ny][nx] = '.';
            result++;
            continue;
          }
          if(checkLower(bd[ny][nx])) {
            keys.add(bd[ny][nx]);
            if(doors.has(bd[ny][nx].toUpperCase())) {
              for(const [oy, ox] of doors.get(bd[ny][nx].toUpperCase())) {
                nextQueue.push([oy, ox]);
                bd[oy][ox] = '.';
              }
            }
            nextQueue.push([ny, nx]);
            bd[ny][nx] = '.';
            continue;
          }

          if(checkUpper(bd[ny][nx])) {
            if(keys.has(bd[ny][nx].toLowerCase())) {
              bd[ny][nx] = '.';
              nextQueue.push([ny, nx]);
            } else {
              if(!doors.has(bd[ny][nx])) {
                doors.set(bd[ny][nx], []);
              }
              doors.get(bd[ny][nx]).push([ny, nx]);
            }
          }
        }
      }
      queue = nextQueue;
    }
  }

  for(let i = 0; i < h - 1; i++) {
    findSide(i, 0);
    findSide(i + 1, v - 1);
  }

  for(let i = 0; i < v - 1; i++) {
    findSide(0, i);
    findSide(h - 1, i + 1);
  }

  bfs();

  return result;
}