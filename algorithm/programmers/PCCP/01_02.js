function solution(ability) {
  var answer = 0;
  let sum = 0;
  const visited = Array(ability.length).fill(false);
  const dfs = (cnt) => {
      if(cnt === ability[0].length) {
          answer = Math.max(answer, sum);
          return;
      }
      
      for(let i = 0; i < ability.length; i++) {
          if(visited[i]) continue;
          visited[i] = true;
          sum += ability[i][cnt];
          dfs(cnt + 1);
          visited[i] = false;
          sum -= ability[i][cnt];
      }
  }
  
  dfs(0);
  return answer;
}