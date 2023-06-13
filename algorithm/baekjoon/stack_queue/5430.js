// https://www.acmicpc.net/problem/5430
// deque
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString();

const input = `4
RDD
4
[1,2,3,4]
DD
1
[42]
RRD
6
[1,1,2,3,5,8]
D
0
[]`;
const [T, ...cases] = input.split('\n');
console.log(solution(Number(T), cases));

function solution(T, cases) {
  let result = '';
  for(let i = 0; i < T; i++) {
    const p = cases[i * 3].split('');
    const arr = cases[i * 3 + 2].slice(1, cases[i * 3 + 2].length - 1).split(',').filter((e) => e !== '');
    let check = false;
    let left = true;

    for(const f of p) {
      if(f === 'R') {
        left = !left;
        continue;
      }
      if(arr.length === 0) {
        check = true;
        break;
      }
      if(left) { 
        arr.shift();
        continue;
      }
      arr.pop();
    }

    if(check) {
      result += 'error\n';
      continue;
    } 
    if(!left) {
      arr.reverse();
    }
    result += `[${arr.join()}]\n`;
  }
  return result.trim();
}

// 시간초과
function solution1(T, cases) {
  const result = [];
  for(let i = 0; i < T; i++) {
    const p = cases[i * 3].split('');
    const n = Number(cases[i * 3 + 1]);
    const arr = cases[i * 3 + 2].slice(1, cases[i * 3 + 2].length - 1).split(',').filter((e) => e !== '');
    let check = false;
    arr.reverse();

    for(const f of p) {
      if(f === 'R') {
        arr.reverse();
        continue;
      }
      if(arr.length === 0) {
        check = true;
        break;
      }
      arr.pop();
    }

    arr.reverse();

    if(check) {
      result.push('error');
    } else {
      result.push(`[${arr.join()}]`);
    }
  }
  return result.join('\n');
}