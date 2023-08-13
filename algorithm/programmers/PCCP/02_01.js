function solution(command) {
  const now = [0,0];
  const direction = [[0,1],[1,0],[0,-1],[-1,0]]
  let d = 0;
  for(const c of command) {
      switch(c){
      case 'R':
          d++;
          break;
      case 'L':
          d = d === 0 ? 3 : d - 1;
          break;
      case 'G':
          now[0] += direction[d % 4][0];
          now[1] += direction[d % 4][1];
          break;
      case 'B':
          now[0] -= direction[d % 4][0];
          now[1] -= direction[d % 4][1];
          break;
      }
  }
  return now;
}