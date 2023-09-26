// https://www.acmicpc.net/problem/14238
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `BBA`;
console.log(solution(input));

function solution (str) {
  const cnt = {
    A: 0,
    B: 0,
    C: 0,
  };

  for(let i = 0; i < str.length; i++) {
    cnt[str[i]]++;
  }

  const visited = Array.from({length: cnt.A + 1}, () => 
    Array.from({length: cnt.B + 1}, () => 
      Array.from({length: cnt.C + 1}, () => 
        Array.from({length: 3}, () => Array(3).fill(null) )
      )
    )
  )
  const result = [];

  const dfs = (a, b, c, e1, e2) => {
    if(a === cnt.A && b === cnt.B && c === cnt.C) {
      return true;
    }
    if(visited[a][b][c][e1][e2]) return false;
    visited[a][b][c][e1][e2] = true;

    if(a + 1 <= cnt.A) {
      result.push('A');
      if(dfs(a + 1, b, c, e2, 0)) {
        return true;
      }
      result.pop();
    }

    if(b + 1 <= cnt.B) {
      result.push('B');
      if(e2 !== 1 && dfs(a, b + 1, c, e2, 1)) {
        return true;
      }
      result.pop();
    }

    if(c + 1 <= cnt.C) {
      result.push('C');
      if(e1 !== 2 && e2 !== 2 && dfs(a, b, c + 1, e2, 2)) {
        return true;
      }
      result.pop();
    }
  }

  if(dfs(0, 0, 0, 0, 0)) {
    return result.join('');
  }

  return -1;
}