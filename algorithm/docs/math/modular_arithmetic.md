# 모듈러 연산
## 모듈러 연산이란
- a % n
- 나눈 후 나머지
## 모듈러 합동
- (a mod n) = (b mod n)
- a와 b는 모듈n에 대한 합동관계
- => a - b = kn
## 모듈러 연산의 속성
- (a + b) mod n = ((a mod n) + (b mod n)) mod n
- (a - b) mod n = ((a mod n) - (b mod n)) mod n
- (a * b) mod n = ((a mod n) * (b mod n)) mod n
## 모듈러 리버스
- (5 / 3) mod 11
  - ((5 mod 11) * (3 mod 11)^1) mod 11
  - (5 * 3^-1) mod 11
    - 3 * x mod 11 는 1이 나와야함 => x = 4 라는 역수도 나옴
- `(5 / 3) mod 11` = `5 * 3^-1 mod 11` = `5 * 4 mod 11` = 9
