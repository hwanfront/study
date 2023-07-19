// https://www.acmicpc.net/problem/20061
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `8
3 1 0
3 0 1
1 2 1
1 0 0
3 2 1
3 0 1
1 3 1
2 2 1`;
const [N, ...numbers] = input.split('\n');
const LEN = 4;
console.log(solution(+N, numbers.map(e => e.split(' ').map(Number))));

function solution (N, numbers) {
  let result = 0;
  let sum = 0;
  let green = Array.from({length: LEN}, () => Array(LEN).fill(false));
  let blue = Array.from({length: LEN}, () => Array(LEN).fill(false));

  const getDropPosInGreen = (t, x) => {
    if(t === 2) {
      return [[x, 1], [x + 1, 1]];
    }
    if(t === 3) {
      return [[x, 2]];
    }
    return [[x, 1]];
  }

  const getDropPosInBlue = (t, x) => {
    if(t === 2) {
      return [[x, 2]];
    }
    if(t === 3) {
      return [[x, 1], [x + 1, 1]];
    }
    return [[x, 1]];
  }

  const greenCheck = () => {
    const newGreen = [];

    for(let i = 0; i < LEN; i++) {
      const hasEmpty = green[i].some((e) => !e);
      if(hasEmpty) {
        newGreen.push(green[i]);
      } else {
        newGreen.unshift(Array.from({length: LEN}, () => false));
        result++;
      }
    }
    green = newGreen;
    return newGreen;
  }

  const blueCheck = () => {
    const newBlue = [];

    for(let i = 0; i < LEN; i++) {
      const hasEmpty = blue[i].some((e) => !e);
      if(hasEmpty) {
        newBlue.push(blue[i]);
      } else {
        newBlue.unshift(Array.from({length: LEN}, () => false));
        result++;
      }
    }
    blue = newBlue;
    return newBlue;
  }

  const drop = (c, pos, check) => {
    let color = c;
    if(pos.length === 1) {
      const [x, cnt] = pos[0];
      for(let i = 0; i < cnt; i++) {
        const idx = color.findIndex(line => line[x]);
        
        if(idx === -1) {
          color[LEN - 1][x] = true;
          color = check();
        } else {
          if(idx === 0) {
            color.pop();
            color.unshift(Array.from({ length: LEN }, (_, i) => i === x));
          } else {
            color[idx - 1][x] = true;
            color = check();
          }
        }
      }
    } else {
      const [ax, ] = pos[0];
      const [bx, ] = pos[1];
      const aIdx = color.findIndex(line => line[ax]);
      const bIdx = color.findIndex(line => line[bx]);
      const min = Math.min(aIdx, bIdx);
      const max = Math.max(aIdx, bIdx);

      if(aIdx === -1 && bIdx === -1) {
        color[LEN - 1][ax] = true;
        color[LEN - 1][bx] = true;
        color = check();
      } else {
        if(min === 0 || max === 0) {
          color.pop();
          color.unshift(Array.from({ length: LEN }, (_, i) => i === ax || i === bx));
        } else if(min === -1) {
          color[max - 1][ax] = true;
          color[max - 1][bx] = true;
          color = check();
        } else {
          color[min - 1][ax] = true;
          color[min - 1][bx] = true;
          color = check();
        }
      }
    }
  }

  for(let i = 0; i < N; i++) {
    const [t, x, y] = numbers[i];
    const gDropPos = getDropPosInGreen(t, y);
    const bDropPos = getDropPosInBlue(t, x);

    drop(green, gDropPos, greenCheck);
    drop(blue, bDropPos, blueCheck);
    greenCheck();
    blueCheck();
  }

  for(let i = 0; i < LEN; i++) {
    for(let j = 0; j < LEN; j++) {
      if(green[i][j]) {
        sum += 1;
      }
      if(blue[i][j]) {
        sum += 1;
      }
    }
  }

  return [result, sum].join('\n');
}