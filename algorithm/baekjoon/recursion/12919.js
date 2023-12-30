// https://www.acmicpc.net/problem/12919
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const input = `A
ABBA`;
const [s, t] = input.split`\n`;
console.log(solution(s, t));

function solution(s, t) {
  const go = (t) => {
    if(t.length === s.length) {
      if(t === s) return true;
      return false;
    }
    if(t.at(-1) === 'A') {
      if(go(t.slice(0, -1))) return true;
    }
    
    if(t.at(0) === 'A') {
      if(t.at(-1) === 'B') return false;
    } 
    
    if(t.at(0) === 'B') {
      if(go(t.slice(1).split``.reverse().join``)) return true;

    }
    return false;
  }
  return go(t) ? 1 : 0;
}