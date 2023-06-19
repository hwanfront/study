// https://www.acmicpc.net/problem/12100
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();

const input = `4
2 16 16 0
32 16 4 1
4 16 32 0
2 0 8 8`;
const [N, ...board] = input.split('\n');
console.log(solution(Number(N), board.map(e => e.split(' ').map(Number))));

function solution (N, board) {
  let result = 0;
  const up = (board) => {
    const newBoard = Array.from({ length: N }, () => ([]));
    for(let i = 0; i < N; i++) {
      const stack = [];
      let isAdded = false;
      for(let j = 0; j < N; j++) {
        if(board[j][i] === 0) continue;
        if(stack.length > 0 && !isAdded) {
          const top = stack[stack.length - 1];
          if(top === board[j][i]) {
            stack[stack.length - 1] += board[j][i];
            isAdded = true;
          }
          else stack.push(board[j][i]);
        } else {
          stack.push(board[j][i]);
          isAdded = false;
        }
      }
      const size = stack.length;
      
      for(let j = 0; j < N - size; j++) {
        stack.push(0);
      }

      for(let j = 0; j < N; j++) {
        newBoard[j].push(stack[j]);
      }
    }
    return newBoard;
  }
  const right = (board) => {
    const newBoard = [];
    for(let i = 0; i < N; i++) {
      const stack = [];
      let isAdded = false;
      for(let j = N - 1; j >= 0; j--) {
        if(board[i][j] === 0) continue;
        if(stack.length > 0 && !isAdded) {
          const top = stack[stack.length - 1];
          if(top === board[i][j]) {
            stack[stack.length - 1] += board[i][j];
            isAdded = true;
          }
          else stack.push(board[i][j]);
        } else {
          stack.push(board[i][j]);
          isAdded = false;
        }
      }
      const size = stack.length;

      for(let j = 0; j < N - size; j++) {
        stack.push(0);
      }
      stack.reverse();
      newBoard.push(stack);
    }
    return newBoard;
  }
  const down = (board) => {
    const newBoard = Array.from({ length: N }, () => ([]));
    for(let i = 0; i < N; i++) {
      const stack = [];
      let isAdded = false;
      for(let j = N - 1; j >= 0; j--) {
        if(board[j][i] === 0) continue;
        if(stack.length > 0 && !isAdded) {
          const top = stack[stack.length - 1];
          if(top === board[j][i]) {
            stack[stack.length - 1] += board[j][i];
            isAdded = true;
          }
          else stack.push(board[j][i]);
        } else {
          stack.push(board[j][i]);
          isAdded = false;
        }
      }
      const size = stack.length;
      
      for(let j = 0; j < N - size; j++) {
        stack.push(0);
      }
      stack.reverse();
      for(let j = 0; j < N; j++) {
        newBoard[j].push(stack[j]);
      }
    }
    return newBoard;
  }
  const left = (board) => {
    const newBoard = [];
    for(let i = 0; i < N; i++) {
      const stack = [];
      let isAdded = false;
      for(let j = 0; j < N; j++) {
        if(board[i][j] === 0) continue;
        if(stack.length > 0 && !isAdded) {
          const top = stack[stack.length - 1];
          if(top === board[i][j]) {
            stack[stack.length - 1] += board[i][j];
            isAdded = true;
          }
          else stack.push(board[i][j]);
        } else {
          stack.push(board[i][j]);
          isAdded = false;
        }
      }
      const size = stack.length;
      
      for(let j = 0; j < N - size; j++) {
        stack.push(0);
      }
      newBoard.push(stack);
    }
    return newBoard;
    
  }
  const dfs = (board, cnt) => {
    if(cnt > 5) return;

    let max = 0;
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        max = Math.max(max, board[i][j]);
      }
    }
    result = Math.max(result, max);

    dfs(up(board), cnt + 1);
    dfs(down(board), cnt + 1);
    dfs(left(board), cnt + 1);
    dfs(right(board), cnt + 1);
  }

  dfs(board, 0);
  return result;
}