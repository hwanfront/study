// https://www.acmicpc.net/problem/11780
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4`;
const [n, m, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(n[0], m[0], data)); 
function solution (n, m, data) {
  const floyd = Array.from({length: n + 1}, () => Array(n + 1).fill(Number.MAX_SAFE_INTEGER));
  const path = Array.from({length: n + 1}, () => Array(n + 1).fill(0));
  let result1 = [];
  let result2 = [];
  let arr2 = [];
  data.forEach(([a, b, c]) => {
    if(floyd[a][b] > c) {
      floyd[a][b] = c;  
    }
  });

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if(i === j) continue;
        if(floyd[i][j] > floyd[i][k] + floyd[k][j]) {
          floyd[i][j] = floyd[i][k] + floyd[k][j];
          path[i][j] = k;
        }
      }      
    }    
  }

  const find = (i, j) => {
    if(path[i][j] === 0) {
      arr2.push(i);
      arr2.push(j);
      return;
    }

    find(i, path[i][j]);
    arr2.pop();
    find(path[i][j], j);
  }

  for(let i = 1; i <= n; i++) {
    const arr1 = [];
    for(let j = 1; j <= n; j++) {
        if(floyd[i][j] === Number.MAX_SAFE_INTEGER) {
        arr1.push(0);
        result2.push([]);
        continue;
      }
      arr2 = [];
      arr1.push(floyd[i][j]);
      find(i, j);
      result2.push(arr2);
    }
    result1.push(arr1.join(' '));
  }

  return result1.join('\n') + '\n' + result2.map(e => e.length === 0 ? 0 : [e.length].concat(e).join(' ')).join('\n');
}
