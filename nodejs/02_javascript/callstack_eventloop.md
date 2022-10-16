## 호출 스택
- 호출 스택 가장 밑에는 가상의 전역 컨텍스트가 항상 있다고 생각
- LIFO 구조
## 이벤트 루프
- 호출 스택 : 실행하면 가장 밑에 anonymous 깔림, 함수 호출되면 위에 차례로 쌓임
- 백그라운드 : 호출 스택에 들어온 함수 중 백그라운드를 사용하는 함수들 받음
  - 티아머, ajax 요청, event listener, FileReader, callback 함수 등
  - 동시에 실행 가능
  - 백그라운드가 먼저 끝나더라도 호출스택이 먼저 실행
- 메모리 : 함수가 선언되면 저장되는 장소
- 테스크 큐 : 백그라운드에서 시간이 지난 함수들을 가져오고, 호출 스택이 비어있을 때 호출 스택으로 넣어줌
```js
function one() {
  console.log('one')
}
function run() {
  console.log('run')
  setTimeout(() => {
    console.log('time')
  }, 0)
  new Promise((resolve) => {
    resolve('resolve')
  }).then(console.log)
  one();
}
setTimeout(run, 5000);
```
```bash
호출스택    [anonymous]        
백그라운드  []
태스크큐    []

호출스택    [anonymous, setTimeout(run, 5000)]        
백그라운드  []
태스크큐    []
 => setTimeout 백그라운드로

호출스택    [anonymous]        
백그라운드  [타이머(run, 5000)]
태스크큐    []

호출스택    []        
백그라운드  [타이머(run, 5000)]
태스크큐    []
 => 5초 후

호출스택    []        
백그라운드  []
태스크큐    [run]
 => 호출스택이 비었으므로
 
호출스택    [run]        
백그라운드  []
태스크큐    []

호출스택    [run, console.log]        
백그라운드  []
태스크큐    []
 => 출력 "run"

호출스택    [run]        
백그라운드  []
태스크큐    []

호출스택    [run, setTimeout(익명, 0)]        
백그라운드  []
태스크큐    []

호출스택    [run]        
백그라운드  [타이머(익명, 0)]
태스크큐    []

호출스택    [run, new Promise]        
백그라운드  [타이머(익명, 0)]
태스크큐    []

호출스택    [run, new Promise, resolve('resolve')]        
백그라운드  [타이머(익명, 0)]
태스크큐    []
 => then 을 만나면 백그라운드로

호출스택    [run]        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []

호출스택    [run, one]        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []

호출스택    [run, one, console.log]        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []

호출스택    [run, one]        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []

호출스택    [run]        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []

호출스택    []        
백그라운드  [타이머(익명, 0), then console.log('resolve')]
태스크큐    []
 => 호출스택이 비었으므로 백그라운드에서 먼저 끝난 것부터 태스크큐로

호출스택    []        
백그라운드  []
태스크큐    [익명, console.log('resolve')]
 => Promise 가 먼저

호출스택    [console.log('resolve')]        
백그라운드  []
태스크큐    [익명]
 => 출력 "resolve"

호출스택    [익명]        
백그라운드  []
태스크큐    []
 => 출력 "time"
```
- `setTimeout` 0초도 백그라운드로 감
- `new Promise(...)` 에서 Promise 까지는 동기
- Promise then/catch 와 process.nextTick 은 테스크큐에서 먼저 나옴