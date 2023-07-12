// https://www.acmicpc.net/problem/17140
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1 2 1
1 2 1
2 1 3
3 3 3`;
const [rck, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(rck, data));

function solution ([r, c, k], data) {
  let arr = JSON.parse(JSON.stringify(data));
  let cnt = 100;

  const R = (data) => {
    let maxLen = 0;
    const result = [];
    for(let i = 0; i < data.length; i++) {
      let r = [];
      const map = new Map();
      for(let j = 0; j < data[0].length; j++) {
        const n = data[i][j];
        if(n === 0) continue;
        if(map.has(n)) {
          map.set(n, map.get(n) + 1);
        } else {
          map.set(n, 1);
        }
      }

      r = r.concat(...[...map].sort(([a1, b1], [a2, b2]) => {
        if(b1 === b2) return a1 - a2;
        return b1 - b2;
      }));

      if(r.length > 100) {
        maxLen = 100;
      } else {
        maxLen = Math.max(maxLen, r.length);
      }

      result.push(r.slice(0, 100));
    }
    
    for(let i = 0; i < result.length; i++) {
      if(result[i].length === maxLen) continue;
      const nowLen = result[i].length;
      result[i].length = maxLen;
      result[i].fill(0, nowLen, maxLen);
    }

    return result;
  }

  const C = (data) => {
    let maxLen = 0;
    const result = [];
    for(let j = 0; j < data[0].length; j++) {
      let r = [];
      const map = new Map();
      for(let i = 0; i < data.length; i++) {
        const n = data[i][j];
        if(n === 0) continue;
        if(map.has(n)) {
          map.set(n, map.get(n) + 1);
        } else {
          map.set(n, 1);
        }
      }

      r = r.concat(...[...map].sort(([a1, b1], [a2, b2]) => {
        if(b1 === b2) return a1 - a2;
        return b1 - b2;
      }));

      if(r.length > 100) {
        maxLen = 100;
      } else {
        maxLen = Math.max(maxLen, r.length);
      }

      result.push(r.slice(0, 100));
    }

    const turnedResult = Array.from({length: maxLen}, () => Array(result.length).fill(0));

    for(let i = 0; i < result.length; i++) {
      for(let j = 0; j < result[i].length; j++) {
        turnedResult[j][i] = result[i][j];
      }
    }

    return turnedResult;
  }

  const check = (r, c, k, data) => {
    if(data.length < r) return false;
    if(data[0].length < c) return false;
    if(data[r - 1][c - 1] === k) return true;
    return false;
  }
  
  while(1) {
    if(check(r, c, k, arr)) return cnt;
    if(cnt === 100) break;
    if(arr.length < arr[0].length) {
      arr = C(arr);
    } else {
      arr = R(arr);
    }
    cnt++;
  }

  return -1
}