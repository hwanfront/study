// https://www.acmicpc.net/problem/5052
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `1
2
33
433`;
const [t, ...args] = input.split('\n');
const result = [];
let p = 0;

for(let i = 0; i < Number(t); i++) {
  const idx = i + p;
  const n = Number(args[idx]);
  const arr = args.slice(idx + 1, idx + 1 + n);
  p += n;

  result.push(solution(n, arr));
}

console.log(result.join('\n'));

function solution(n, arr) {
  if(n === 1) {
    return 'YES';
  }
  arr.sort();
  
  for(let i = 1; i < arr.length; i++) {
    if(arr[i].indexOf(arr[i - 1]) === 0) return 'NO';
  }

  return 'YES';
}
