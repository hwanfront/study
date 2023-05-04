// https://school.programmers.co.kr/learn/courses/30/lessons/42885
function solution(people, limit) {
  const sortedPeople = people.sort((a, b) => b - a);
  let cnt = 0;
  
  for(let i = 0; i < sortedPeople.length - 1; i++) {
      if(sortedPeople[i] + sortedPeople[sortedPeople.length - 1] <= limit) {
          if(i === sortedPeople.length - 2) break;
          sortedPeople.pop();        
      }
      cnt++;
  }
  return cnt + 1;
}

function beforeSolution(people, limit) {
  people.sort((a, b) => a - b);
  let left = 0;
  let right = people.length - 1;
  let cnt = 0;
  
  while(left <= right) {
      if(people[left] + people[right] <= limit) {
          left++;
          right--;
          cnt++;
      } else {
          right--;
          cnt++;
      }
  }
  return cnt;
}