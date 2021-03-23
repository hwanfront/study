
## flexible box
- **display**: flex, inline-flex
  - flex: 블록수준 작동
  - inline-flex: 인라인수준 작동
- **flex-direction**
  - row: 박스 왼쪽에서 오른쪽 배치, 주축은 가로
  - column: 박스 위에서 아래로 배치, 주축은 세로
- **flex-wrap** 플렉스 아이템 여러 줄 배치
  - nowrap: 박스를 한줄로 배치
  - wrap: 박스를 여러줄로 배치
- **flex-flow**
 [flex-direction] [flex-wrap]

- **justify-content** 주축 방향 플렉스 아이템 배치
  - flex-start: 자식박스를 부모박스 주축 시작점으로 배치
  - flex-end: 자식박스를 부모박스 주축 끝점으로 배치
  - center: 자식박스를 부모박스  중앙으로 배치
  - space-between: 첫 번째 마지막 박스는 양쪽끝으로, 나머지는 동일한 간격으로 정렬
  - space-around: 동일한 간격으로 정렬하고 양쪽 끝 박스의 양 옆에도 공간을 둠
- **align-items**
  - stretch: 박스 확장해서 배치
  - flex-start: 박스 교차축의 시작점에 배치
  - flex-end: 박스 교차축의 끝점에 배치
  - center: 박스 교차축의 중앙에 배치
  - baseline: 자식 박스들을 글자축의 시작점에 배치되는 자식박스의 글자 베이스라인에 맞춰 배치. 시작점에 배치되는 자식박스는 교차축의 시작점과 글자 베이스라인의 거리가 가장 먼 박스가 교차축의 시작점에 배치됩니다.
- **align-self**