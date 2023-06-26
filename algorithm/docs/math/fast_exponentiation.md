# fast exponentiation 빠른 거듭제곱 알고리즘
## 의미
- 분할 정복을 이용한 거듭제곱 이라고도 한다.
- `a 의 n 거듭제곱`을 구하기 위해서는 a를 n-1번 곱해야 한다.
- 빠른 거듭제곱 알고리즘을 사용하면 O(logn)의 시간 복잡도로 계산이 가능하다.
## square and multiply 개념
```bash
a ** 9 = a ** 0b1001 = (a ** 8) * 1 * 1 * (a ** 1)
```
## 결론
- a의 n 제곱에서 
  - n이 짝수일 땐 지수는 반으로 쪼개진다. 
  - n이 홀수일 땐 지수에 1을 빼고 반으로 나눈 후 밑을 한번 더 곱한다. 
- `a ** n` = 
  - `(a ** n / 2) * (a *** n / 2)` if a % 2 === 0
  - `(a ** (n - 1) / 2) * (a *** (n - 1) / 2) * a` else a % 2 === 1
## 동작
- 지수(n)가 홀수일 경우 결과값에 밑을 한 번 곱한다.
- 밑(a)을 제곱하고 지수를 반으로 쪼갠다.
- 지수가 0이 될 때까지 반복한다.
## 코드
- 일반적인 빠른 거듭제곱
```js
const pow = (C, n) => {
  let result = 1;
  while(n) {
    if(n & 1) { 
      result *= C;
    }
    C *= C;
    n = n >> 1;
  }
  return result;
}
```
- 페르마의 소정리를 이용한 이항계수 구하기
```js
  const pow = (x, y) => {
    let result = 1n;
    while(y) {
      if(y & 1) { 
        result = (result * x) % MODULAR;
      }
      x = (x * x) % MODULAR;
      y = Number(y) >> 1;
    }
    return result;
  }
```