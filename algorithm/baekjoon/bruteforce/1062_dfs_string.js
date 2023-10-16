// https://www.acmicpc.net/problem/1062
// const input = require("fs").readFileSync("/dev/stdin").toString().trim(); 
const input = `2 5
antatica
antartica`;
const [nk, ...data] = input.split('\n');
console.log(solution(nk.split(' ').map(Number), data));

function solution ([n, k], data) {
  if(k - 5 < 0) return 0;
  const arr = Array(26).fill(false);
  const mid = data.map(e => e.slice(4, e.length - 4));
  let result = 0;
  const code = (ch) => ch.charCodeAt() - 97;
  arr[code('a')] = true;
  arr[code('n')] = true;
  arr[code('t')] = true;
  arr[code('c')] = true;
  arr[code('i')] = true;


  const dfs = (from, cnt) => {
    if(cnt === k) {
      let cnt = 0;
      mid.forEach((m) => {
        let is = true;
        for(const c of m) {
          if(arr[code(c)]) continue;
          is = false;
          break;
        }
        if(is) cnt++;
      })
      result = Math.max(result, cnt);
      return;
    }

    for(let i = from; i < 26; i++) {
      if(arr[i]) continue;
      arr[i] = true;
      dfs(i + 1, cnt + 1);
      arr[i] = false;
    }
  }

  dfs(0, 5);

  return result
}