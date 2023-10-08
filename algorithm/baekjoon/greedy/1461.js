// https://www.acmicpc.net/problem/1461
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 

const input = `2 50
-1 -2`;
const [nm, data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(nm, data));

function solution ([n, m], data) {
  if(n === 1) return Math.abs(data[0]);
  const pn = [];
  const nn = [];
  let result = 0;

  for(const num of data) {
    if(num === 0) continue;
    if(num > 0) {
      pn.push(num);
    } else {
      nn.push(-num);
    }
  }

  pn.sort((a, b) => a - b);
  nn.sort((a, b) => a - b);

  if(pn.length === 0) {
    let i = nn.length - 1;
    result += nn[i];
    i -= m;
    for(; i >= 0; i -= m) {
      result += nn[i] * 2;
    }
  } else if(nn.length === 0) {
    let i = pn.length - 1;
    result += pn[i];
    i -= m;
    for(; i >= 0; i -= m) {
      result += pn[i] * 2;
    }
  } else if(pn[pn.length - 1] < nn[nn.length - 1]) {
    for(let i = pn.length - 1; i >= 0; i -= m) {
      result += pn[i] * 2;
    }
    let j = nn.length - 1;
    if(j === -1) return result;
    result += nn[j];
    j -= m;
    for(; j >= 0; j -= m) {
      result += nn[j] * 2;
    }
  } else {
    for(let i = nn.length - 1; i >= 0; i -= m) {
      result += nn[i] * 2;
    }
    let j = pn.length - 1;
    if(j === -1) return result;
    result += pn[j];
    j -= m;
    for(; j >= 0; j -= m) {
      result += pn[j] * 2;
    }
  }

  return result;
}