// https://www.acmicpc.net/problem/1759
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `4 6
a t c i s w`;
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const [LC, str] = input.split('\n');
const [L, C] = input.split(' ');
const chars = str.split(' ');
console.log(solution(Number(L), chars));

function solution(L, chars) {
  const result = [];
  const visited = Array(chars.length).fill(false);
  const stack = [];

  chars.sort();

  const checkVowelsCnt = () => {
    return stack.some((e) => VOWELS.includes(e));
  }

  const checkConsonantCnt = () => {
    let cnt = 0;
    for(let i = 0; i < stack.length; i++) {
      if(VOWELS.includes(stack[i])) {
        continue;
      }
      if(++cnt > 1) {
        return true;
      }
    }
    return false;
  }

  const dfs = (num) => {
    if(checkVowelsCnt() && checkConsonantCnt() && stack.length === L) {
      result.push(stack.join(''));
    }

    for(let i = num; i < chars.length; i++) {
      if(visited[i]) {
        continue;
      }
      for(let j = 0; j < i; j++) {
        visited[j] = true;
      }
      visited[i] = true;
      stack.push(chars[i]);
      dfs(num++);
      for(let j = 0; j < i; j++) {
        visited[j] = false;
      }
      visited[i] = false;
      stack.pop();
    }
  }
  dfs(0);
  return result.join('\n');
}
