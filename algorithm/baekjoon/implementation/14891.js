// https://www.acmicpc.net/problem/14891
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `10101111
01111101
11001110
00000010
2
3 -1
1 1`;
const [g1, g2, g3, g4, k, ...data] = input.split('\n');
const gears = [g1, g2, g3, g4];
console.log(solution(gears, data.map(e => e.split(' ').map(Number))));

/**
 * 1[2] 2[6]
 * 2[2] 3[6]
 * 3[2] 4[6]
 */

function solution (gears, t) {
  let result = 0;
  const tops = [0, 0, 0, 0, 0];

  const turnRight = (top) => {
    return (top + 7) % 8;
  }

  const turnLeft = (top) => {
    return (top + 1) % 8;
  }

  const getRight = (top) => {
    return (top + 2) % 8;
  }

  const getLeft = (top) => {
    return (top + 6) % 8;
  }

  const turn = (from, to) => {
    if(gears[from - 1][getRight(tops[from])] === gears[to - 1][getLeft(tops[to])]) {
      return false;
    }
    return true;
  }

  for(const [num, d] of t) {
    const arr = [];
    switch (num) {
    case 1:
      arr.push([1, d]);
      if(turn(1, 2)) {
        arr.push([2, -d]);
        if(turn(2, 3)) {
          arr.push([3, d]);
          if(turn(3, 4)) {
            arr.push([4, -d]);
          }
        }
      }
      break;
    case 2:
      arr.push([2, d]);
      if(turn(1, 2)) arr.push([1, -d]);
      if(turn(2, 3)) {
        arr.push([3, -d])
        if(turn(3, 4)) {
          arr.push([4, d])
        }
      }
      break;
    case 3:
      arr.push([3, d]);
      if(turn(2, 3)) {
        arr.push([2, -d])
        if(turn(1, 2)) {
          arr.push([1, d])
        }
      }
      if(turn(3, 4)) arr.push([4, -d]);
      break;
    case 4:
      arr.push([4, d]);
      if(turn(3, 4)) {
        arr.push([3, -d]);
        if(turn(2, 3)) {
          arr.push([2, d]);
          if(turn(1, 2)) {
            arr.push([1, -d]);
          }
        }
      }
      break;
    }

    for(const [num, lr] of arr) {
      if(lr === 1) {
        tops[num] = turnRight(tops[num]);
      } else {
        tops[num] = turnLeft(tops[num]);
      }
    }
  }

  for(let i = 0; i < 4; i++) {
    if(gears[i][tops[i + 1]] === '1') result += 1 << i;
  }

  return result;
}