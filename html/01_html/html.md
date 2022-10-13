## html 문서 기본 구조
### <!DOCTYPE> 
- 문서유형지정
```html
<!DOCTYPE html>
```
### html
- 웹 문서 시작을 알리는 태그
```html
<html lang="ko">
```
### head
- 문서정보
```html
<head>
  ...
</head>
```
#### meta
- 문서정보 (charset, 모바일기기 고려, 익스플로러나 검색엔진 고려 등)
```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```
#### title
- 문서제목
- 화면에 보일 내용
```html
<head>
  <title>문서제목</title>
</head>
```