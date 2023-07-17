// https://www.acmicpc.net/problem/17825
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 1 2 3 4 5 5 3 2 4`;
const root = [
  Array.from({ length: 20 }, (_, i) => i * 2),
  [10, 13, 16, 19],
  [20, 22, 24],
  [30, 28, 27, 26],
  [25, 30, 35, 40, 0]
]
const visited = [
  Array(20).fill(false),
  Array(4).fill(false),
  Array(3).fill(false),
  Array(4).fill(false),
  Array(5).fill(false),
]
console.log(solution(input.split(' ').map(Number)));

function solution (numbers) {
  let result = 0;
  const info = Array.from({length: 4}, () => ({ root: 0, pos: 0 }));

  const move = (info, to) => {
    if(info.root === 0) {
      if(info.pos + to === 20) {
        return { root: 4, pos: 3 };
      }
      if((info.pos + to) % 5 === 0) {
        return { root: (info.pos + to) / 5, pos: 0 };
      }
      if(info.pos + to < 21) {
        return { root: info.root, pos: info.pos + to };
      }
    }

    if(info.root === 4) {
      if(info.pos + to < root[info.root].length) {
        return { root: info.root, pos: info.pos + to };
      }
    }

    if([1, 2, 3].includes(info.root)) {
      if(info.pos + to < root[info.root].length) {
        return { root: info.root, pos: info.pos + to };
      } else {
        return { root: 4, pos: info.pos + to - root[info.root].length }
      }
    }

    return { root: 4, pos: 4 };
  }
  
  const dfs = (cnt, sum) => {
    if(cnt === 10) {
      result = Math.max(result, sum);
      return;
    }

    for(let j = 0; j < 4; j++) {
      const nowInfo = info[j];
      const newInfo = move(nowInfo, numbers[cnt]);

      if(!(newInfo.root === 4 && newInfo.pos === 4) 
        && visited[newInfo.root][newInfo.pos]) continue;
      
      visited[nowInfo.root][nowInfo.pos] = false;
      visited[newInfo.root][newInfo.pos] = true;
      info[j] = newInfo;
      dfs(cnt + 1, sum + root[newInfo.root][newInfo.pos]);
      visited[nowInfo.root][nowInfo.pos] = true;
      visited[newInfo.root][newInfo.pos] = false;
      info[j] = nowInfo;
    }
  }

  dfs(0, 0);

  return result;
}