// https://www.acmicpc.net/problem/9466
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `2
7
3 1 3 7 3 4 6
8
1 2 3 4 5 6 7 8`.split('\n');
let result = '';
let cnt;
let visited;
let numbers;
let done;

const dfs = (start) => {
  const next = numbers[start];
  visited[start] = true;
  
  if(!visited[next]) {    
    dfs(next);
  } else {
    if(!done[next]) {
      for(let i = next; i !== start; i = numbers[i]) {
        cnt++;
      }
      cnt++;
    }
  }
  done[start] = true;
}

for(let i = 1; i < input.length; i += 2) {
  const n = Number(input[i]);
  cnt = 0;
  visited = Array(n + 1).fill(false);
  numbers = [0, ...input[i + 1].split(' ').map(Number)];
  done = Array(n + 1).fill(false);

  for(let j = 1; j < n + 1; j++) {
    if(visited[j]) continue;
    dfs(j);
  }

  result += `${n - cnt}\n`;
}

console.log(result.trim());