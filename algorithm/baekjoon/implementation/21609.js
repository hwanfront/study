// https://www.acmicpc.net/problem/21609
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `2 1
-1 -1
-1 -1`;
let [NM, ...grid] = input.split('\n').map(e => e.split(' ').map(Number));
const direction = [[-1, 0],[0, -1],[0, 1],[1, 0]];
console.log(solution(NM, grid));

function solution ([N, M], grid) {
  const COLOR_B = -1;
  const COLOR_R = 0;
  const EMPTY = -2;
  let result = 0;

  const check = (y, x) => 0 <= y && y < N && 0 <= x && x < N;

  // blockGroup => normal 1개 이상 + 모두 같은 색, black 0개, rainbow 0~n개, 블록 개수는 2개 이상
  // 크기가 가장 큰 블록 그룹 찾기
  const bfs = (pos, block, v) => {
    v[pos[0]][pos[1]] = true;
    const visited = JSON.parse(JSON.stringify(v));
    let queue = [pos];

    const result = [];
    let cntR = 0;

    while(queue.length > 0) {
      const size = queue.length;
      const nextQueue = [];
      for(let i = 0; i < size; i++) {
        const [y, x] = queue[i];
        result.push([y, x]);
        for(const [dy, dx] of direction) {
          const ny = dy + y;
          const nx = dx + x;
          if(!check(ny, nx)) continue;
          if(visited[ny][nx]) continue;
          if(grid[ny][nx] === EMPTY) continue;
          if(grid[ny][nx] === COLOR_B) continue;
          visited[ny][nx] = true;
          if(grid[ny][nx] === COLOR_R) {
            nextQueue.push([ny, nx]);
            cntR++;
            continue;
          }
          if(grid[ny][nx] === block) {
            nextQueue.push([ny, nx]);
            v[ny][nx] = true;
          } 
        }
      }
      queue = nextQueue;
    }

    return [result, cntR];
  }

  // 제거 후 -1을 제외한 모든 블록이 밑으로
  const drop = (grid) => {
    for(let i = 0; i < N; i++) {
      let btm = N - 1;
      for(let j = N - 1; j >= 0; j--) {
        if(grid[j][i] === EMPTY) continue;
        if(grid[j][i] === COLOR_B) {
          btm = j - 1;
          continue;
        }
        if(j !== btm) {
          const value = grid[j][i];
          grid[j][i] = EMPTY;
          grid[btm][i] = value;
        }
        btm--;
      }
    }
  }
  // 90도 반시계 회전
  const turn = (grid) => {
    const newGrid = Array.from({length: N}, () => Array(N).fill(EMPTY));
    
    for(let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        newGrid[i][j] = grid[j][N - i - 1];        
      }
    }
    return newGrid;
  }

  // 회전 후 -1을 제외한 모든 블록이 밑으로 
  while(1){
    let myBlocks = [];
    let myCntR = 0;
    const visited = Array.from({length: N}, () => Array(N).fill(false));

    for(let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if(visited[i][j]) continue;
        if(grid[i][j] < 1) continue;
        const [blocks, cntR] = bfs([i, j], grid[i][j], visited);
        // 여러 개라면 무지개 블록 -> 행 -> 열
        if(myBlocks.length < blocks.length) {
          myBlocks = blocks;
          myCntR = cntR;
          continue;
        }
        if(myBlocks.length === blocks.length && myCntR <= cntR) {
          myBlocks = blocks;
          myCntR = cntR;
        }
      }
    }
    // console.log(myBlocks);
    if(myBlocks.length < 2) break;
    // 찾은 그룹 블록 제거, n개 제거 시 점수 Math.pow(n, 2) 획득
    result += Math.pow(myBlocks.length, 2);
    myBlocks.forEach(([y, x]) => grid[y][x] = EMPTY);
    // console.log(grid);
    drop(grid);
    grid = turn(grid);
    drop(grid);
  }

  return result;
}