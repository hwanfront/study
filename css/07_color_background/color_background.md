## background
### background-clip : 배경 적용 범위 조절
- border-box : 박스 모델의 가장 외곽 테두리(border)까지 적용
- padding-box : 박스 모델에서 테두리를 뺀 패딩범위까지 적용
- content-box : 박스 모델의 내용부분만 적용
### background-repeat
- 배경 이미지 크기가 채우려는 요소보다 작을 경우 반복 표시, 기본은 repeat
### background-size
- auto : 기본값, 배경 이미지 크기 그대로 표시
- contain : 요소 안에 배경 이미지가 다 들어오도록 이미지 확대/축소
  - 가로/세로 중 작은 요소에 맞춰 이미지 출력, 그림 비율은 그대로
- cover : 배경 이미지로 요소를 모두 덮도록 이미지 확대/축소
  - 가로/세로 중 긴 요소에 맞춰 이미지 출력, 벗어나면 안보일 수 있음
- 100% 100% : 요소의 너비와 높이에 맞게 
### background-position
- 배경 이미지가 표시되는 위치 
### background-origin
- 베경 이미지 배치 기준
- border-box
- padding-box (기본값)
- content-box
### background-attachment
- 배경 이미지 고정