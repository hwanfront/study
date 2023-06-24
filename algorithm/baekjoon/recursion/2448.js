// https://www.acmicpc.net/problem/2448
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `24`;
const n = +input;
console.log(solution(n));

function solution (n) {
  const first = [`  *  `, ` * * `, `*****`];
  const draw = (x, stars) => {
    const size = stars.length;
    const newStars = stars.map(e => `${' '.repeat(x)}${e}${' '.repeat(x)}`);
    for(let i = 0; i < size; i++) {
      newStars.push(`${stars[i]} ${stars[i]}`);
    }
    if(x * 2 === n) {
      return newStars;
    }
    return draw(x * 2, newStars);
  }
  if(n === 3) return first.join('\n');
  return draw(3, first).join('\n');
}