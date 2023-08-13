function solution(n, m, hole) {
  const direction = [[1,0],[0,1],[-1,0],[0,-1]];
  const check = (y, x) => 0 < y && y <= m && 0 < x && x <= n;
  const grid = Array.from({length: m + 1}, () => Array(n + 1).fill(false));
  
  for(const [x, y] of hole) {
      grid[y][x] = true;
  }
  
  const bfs = () => {
      const visited1 = Array.from({length: m + 1}, () => Array(n + 1).fill(false));
      const visited2 = Array.from({length: m + 1}, () => Array(n + 1).fill(false));
      let queue = [[1, 1, 0, false]];
      visited1[1][1] = true;
      while(queue.length > 0) {
          const nextQueue = [];
          for(let i = 0; i < queue.length; i++) {
              const [y, x, cnt, c] = queue[i];
              if(y === m && x === n) return cnt;
              if(!c) {
                  for(const [dy, dx] of direction) {
                      const [ny, nx] = [y + dy * 2, x + dx * 2];
                      if(!check(ny, nx)) continue;
                      if(grid[ny][nx]) continue;
                      if(visited2[ny][nx]) continue;
                      visited2[ny][nx] = true;
                      nextQueue.push([ny, nx, cnt + 1, true]);
                  }
              }
              for(const [dy, dx] of direction) {
                  const [ny, nx] = [y + dy, x + dx];
                  if(!check(ny, nx)) continue;
                  if(grid[ny][nx]) continue;
                  if(c) {
                      if(visited2[ny][nx]) continue;
                      visited2[ny][nx] = true
                  } else {
                      if(visited1[ny][nx]) continue;
                      visited1[ny][nx] = true
                  }
                  nextQueue.push([ny, nx, cnt + 1, c])
              }
          }
          queue = nextQueue;
      }
      return -1;
  }
  
  return bfs();
}