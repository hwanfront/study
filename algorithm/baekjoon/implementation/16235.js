// https://www.acmicpc.net/problem/16235
// const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = `5 2 9
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 1 3
3 2 3`;
const direction = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]];
const [NMK, ...data] = input.split('\n').map(e => e.split(' ').map(Number));
console.log(solution(NMK, data));

function solution ([N, M, K], data) {
  const nutrients = [];
  const map = Array.from({ length: N + 1 }, () => Array(N + 1).fill(5));
  let trees = [];
  let dead = [];

  nutrients.push(Array(N + 1).fill(0));
  for(let i = 0; i < N; i++) {
    nutrients.push([0].concat(data[i]));
  }

  for(let i = N; i < data.length; i++) {
    trees.push(data[i]);
  }

  const check = (y, x) => 0 < y && y <= N && 0 < x && x <= N;

  const sortTrees = () => {
    trees.sort((a, b) => a[2] - b[2]);
  }

  const addNutrients = () => {
    for(let i = 1; i <= N; i++) {
      for(let j = 1; j <= N; j++) {
        map[i][j] += nutrients[i][j];
      }
    }
  };

  const spring = () => {
    const eat = (tree) => {
      const [y, x, year] = tree;
      if(map[y][x] >= year) {
        map[y][x] -= year;
        return true;
      }
      return false;
    }

    const newTrees = [];
    const newDead = []
    
    for(const tree of trees) {
      if(eat(tree)) {
        const [y, x, year] = tree;
        newTrees.push([y, x, year + 1]);
      } else {
        newDead.push(tree);
      }
    }
    trees = newTrees;
    dead = newDead;
  }

  const summer = () => {
    for(const [y, x, year] of dead) {
      map[y][x] += Math.floor(year / 2);
    }
  }

  const autumn = () => {
    const newTrees = [];
    for(const [y, x, year] of trees) {
      if(year % 5 !== 0) continue;
      for(const [dy, dx] of direction) {
        const ny = y + dy;
        const nx = x + dx;
        if(!check(ny, nx)) continue;
        newTrees.push([ny, nx, 1]);
      }
    }
    trees = newTrees.concat(trees);
  }
  
  const winter = () => {
    addNutrients();
  }

  sortTrees();
  
  for(let i = 0; i < K; i++) {
    spring();
    summer();
    autumn();
    winter();
  }

  return trees.length;
}