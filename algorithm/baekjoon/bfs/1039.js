// https://www.acmicpc.net/problem/1039
// const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const input = `10 1`;
const [n, k] = input.split(' ');
console.log(solution(n, +k));

function solution (n, k) {
  const visited = new Map();
  let max = -1;

  const bfs = () => {
    let queue = [[n, 0]];

    while(queue.length > 0) {
      const nextQueue = [];
      for(const [num, cnt] of queue) {
        if(cnt > k) break;
        if(cnt !== 0 && cnt % 2 === k % 2) {
          max = Math.max(max, +num);
        }

        for(let i = 0; i < num.length - 1; i++) {
          for(let j = i + 1; j < num.length; j++) {
            if(i === 0 && num.at(j) === '0') continue;
            let nn = num.split('');
            nn[i] = num.at(j);
            nn[j] = num.at(i);
            const snn = nn.join('');
            if(!visited.has(snn)) {
              visited.set(snn, [false, false]);
              visited.get(snn)[cnt % 2] = true;
              nextQueue.push([snn, cnt + 1]);
              continue;
            }
            if(visited.get(snn)[cnt % 2]) continue;
            visited.get(snn)[cnt % 2] = true;
            nextQueue.push([snn, cnt + 1]);
          }
        }
      }
      queue = nextQueue;
    }
  }

  bfs();
  
  return max;
}
