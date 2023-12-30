// https://www.acmicpc.net/problem/2613
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `9 6
1 1 1 1 1 1 1 1 1`;
const [nm, data] = input.split`\n`.map(e => e.split` `.map(Number));
console.log(solution(nm, data));

function solution([n, m], data) {
  let left = 0;
  let right = data.reduce((p, c) => p + c, 0);
  let mid;
  let res = [];
  while(left < right) {
    mid = Math.floor((left + right) / 2);
    res = [];
    let sum = 0;
    let cnt = 0;
    let is = false;
    for(let i = 0; i < n; i++) {
      if(data[i] > mid) {
        is = true;
        break;
      }
      if(sum + data[i] > mid) {
        res.push(cnt);
        sum = data[i];
        cnt = 1;
      } else {
        cnt++;
        sum += data[i];
      }
    }
    res.push(cnt);
    
    if(is) {
      left = mid + 1;
      continue;
    }
    if(res.length > m) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  res = [];
  let sum = 0;
  let cnt = 0;

  for(let i = 0; i < n; i++) {
    if(sum + data[i] > left) {
      res.push(cnt);
      sum = data[i];
      cnt = 1;
    } else {
      cnt++;
      sum += data[i];
    }
  }
  res.push(cnt);

  let c = m - res.length;
  if(c === 0) return `${right}\n${res.join` `}`;

  const result = [];
  for(let i = 0; i < res.length; i++) {
    while(res[i] > 1 && c > 0) {
      res[i]--;
      c--
      result.push(1);
    }
    result.push(res[i]);
  }

  return `${right}\n${result.join` `}`;
}