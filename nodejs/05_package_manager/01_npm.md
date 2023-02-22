# NPM (Node Package Manager)
- 노드의 패키지 매니저
- 사람들의 소스 코드들을 모아둔 저장소
- 이미 있는 기능을 다시 구현할 필요가 없어 효율적
- 오픈 소스 생태계 구성
## 패키지
- npm에 업로드된 노드 모듈
- 모듈이 다른 모듈을 사용할 수 있듯 패키지도 다른 패키지를 사용할 수 있음
- 의존관계라고 부름
  - 같은 패키지라도 버전별로 기능이 다를 수 있음, 버전 기록해야 함
  - 동일 버전을 설치하지 않으면 문제 발생
## package.json
- 처음으로 보는 파일, 현재 프로젝트에 대한 정보와 사용중인 패키지 정보를 담은 파일
- npm init 시 package.json 자동 생성
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "hwanfront",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "rimraf": "^4.1.2"
  }
}
``` 
- npm run `script`: script 실행
- npm i `package`: 패키지 설치, `dependencies`에 추가
  - -D: 개발할 때만 쓰이는 `devDependencies`에 추가
  - -g: global 설치, dependency에 추가되지 않음 
### SemVer versioning
- Semantic Versioning
- package의 버전을 세 자리로
```bash
[Major].[Minor].[Patch]
[주버전].[부버전].[수버전]
^ caret
~ tilde
>= <= > <
@latest
@next
-alpha.0 -beta.1 -rc.0
```
- Major: 하위 버전과 호환되지 않은 수정사항 발생 시 올림
- Minor: 하위 버전과 호환되는 수정 사항이 발생 시 올림
- Patch: 기능에 간단한 버그를 해결했을 때 올림
- ^(caret): 패키지 업데이트 시 minor 버전까지만 업데이트 됨
  - ^1.1.1 이면 2.0.0 버전은 안됌
- ~(tilde): 패키지 업데이트 시 patch 버전까지만 업데이트 됨
  - ~1.1.1 이면 1.2.0 버전은 안됌
- @latest: 최신
- @next: 가장 최신 배포판 (불안정)
- 알파/베타/RC버전 등
  - RC: 베타 다음 단계, 출시 직전 점검 단계
## package-lock.json
- npm i 이후 생기는 파일
- 정확한 버전을 고정해놓고, 버전 문제가 발생하지 않게 도와주고 버전 문제 외에는 보통은 건드리지 않음
## node_modules
- npm i 이후 생기는 폴더
- 다운받은 패키지들의 파일, 본인이 직접 관리하지는 않음
- 설치한 패키지의 dependencies를 모두 가져옴
## npx
- npm 5.2 부터 추가된 도구, npm 패키지를 쉽게 실행할 수 있는
- npm 레지스트리에 접근해 실행시키고 설치하는 실행 도구
- 로컬에 설치된 패키지를 사용할 때
- 일회성 명령으로 패키지를 실행할 때 (create-react-app 등)
- 다른 node 버전으로 명령을 실행할 경우 node 패키지를 사용하여 편하게 사용 가능
### npx 등장 이유
- 과거 npm 의존성 라이브러리 관리 방법
  - 전역으로 패키지 설치 후 의존성 라이브러리들을 전체적으로 관리
  - 특정 프로젝트에만 의존성 라이브러리 설치
- 패키지가 업데이트 된다면 전역, 로컬 모두 따로 업데이트 하는 등 번거로움
