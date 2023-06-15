// https://www.acmicpc.net/problem/1786
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `ABC ABCDAB ABCDABCDABDEABCDABD
ABCDABD`
const [T, P] = input.split('\n');
console.log(solution(T, P));

function solution (T, P) {
  const getPi = (pattern) => {
    const result = Array(pattern.length).fill(0);
    let j = 0;
    for(let i = 1; i < pattern.length; i++) {
      while(j > 0 && pattern[i] !== pattern[j]) {
        j = result[j - 1];
      }
      if(pattern[i] === pattern[j]) {
        result[i] = ++j;
      }
    }
    return result;
  }
  const kmp = (text, pattern, pi) => {
    const result = [];
    let j = 0;
    for(let i = 0; i < text.length; i++) {
      while(j > 0 && text[i] !== pattern[j]) {
        j = pi[j - 1];
      }
      if(text[i] === pattern[j]) {
        if(j === pattern.length - 1) {
          result.push(i - pattern.length + 1);
          j = pi[j];
        } else {
          j++;
        }
      }
    }
    return result;
  }

  const pi = getPi(P);
  const result = kmp(T, P, pi).map(e => e + 1);
  return `${result.length}\n${result.join(' ')}`;
}