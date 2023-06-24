// https://www.acmicpc.net/problem/2447
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `81`;
const n = +input;
console.log(solution2(n));

function solution2 (n) {
  const draw = (n) => {
    if(n === 1) return `*`;

    const stars = draw(Math.floor(n / 3));
    const result = [];
    
    for(const s of stars) {
      result.push(s.repeat(3));
    }
    for(const s of stars) {
      result.push(`${s}${' '.repeat(Math.floor(n / 3))}${s}`);
    }
    for(const s of stars) {
      result.push(s.repeat(3));
    }

    return result;
  }
  return draw(n).join('\n');
}

function solution1 (n) {
  let result = '';

  const draw = (i, j, n) => {
    if(Math.floor(i / n) % 3 === 1 && Math.floor(j / n) % 3 === 1) {
      result += ' ';
    } else {
      if(Math.floor(n / 3) === 0) {
        result += '*';
      } else {
        draw(i, j, n / 3);
      }
    }
  }

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      draw(i, j, n);
    }
    result += '\n';
  }

  return result.trim();
}