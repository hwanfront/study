# KMP 알고리즘
## 의미
- 문자열을 검색하는 과정에서 조금이라도 일치했던 정보를 활용함
- prefix와 suffix가 같은 부분에 대한 정보를 미리 전처리 해둔 pi 배열을 생성
- pi배열을 이용해 중간 시도를 건너뜀
## 시간복잡도
- 텍스트 길이가 N, 패턴의 길이가 M 일 때, O(N+M)
  - 참고로 단순 문자열 비교는 O(NM)
## 코드
### getPi 함수
```js
const getPi = (pattern) => {
  const result = Array(pattern.length).fill(0);
  let j = 0;
  for(let i = 1; i < pattern.length; i++) {
    while(j > 0 && pattern[i] !== pattern[j]) {
      j = result[j - 1];
    }
    if(pattern[i] === pattern[j]) {
      result[i] = ++j;
    }
  }
  return result;
}
```
```js
const kmp = (text, pattern, pi) => {
  const result = [];
  let j = 0;
  for(let i = 0; i < text.length; i++) {
    while(j > 0 && text[i] !== pattern[j]) {
      j = pi[j - 1];
    }
    if(text[i] === pattern[j]) {
      if(j === pattern.length - 1) {
        result.push(i - pattern.length + 1);
        j = pi[j];
      } else {
        j++;
      }
    }
  }
  return result;
}
```
### 참고
- [KMP : 문자열 검색 알고리즘](https://bowbowbow.tistory.com/6)