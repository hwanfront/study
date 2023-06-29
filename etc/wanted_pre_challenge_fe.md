# 원티드 프리온보딩 사전과제
## 1. CSR(Client-side Rendering)이란 무엇이며, 그것의 장단점에 대하여 설명해주세요.
### 과거 Server Side Rendering
SSR 방식은 클라이언트가 서버에 요청을 보내면 서버에서 처리합니다. 클라이언트의 요청이 들어올 때마다 매번 새로운 화면을 구성하여 전달합니다. 클라이언트의 요청으로 화면에서 바뀌지 않아도 되는 부분이 있다 하더라도 서버는 페이지 전체를 반환하기 때문에 화면 전체를 다시 렌더링해야 합니다. 화면 전체를 렌더링하다보니 클라이언트의 요청마다 화면 전환이 일어나 깜빡임이 생깁니다. 당연히 서버의 부담이 커지고, 사용자가 요청을 보냈을 때 처리해야 할 사항이 많다보니 사용자가 알아챌 만큼 반응이 없어지는 경우가 생기기도 합니다.
### Client Side Rendering
서버에서 화면을 구성했던 SSR 방식과는 다르게 클라이언트에서 렌더링을 처리합니다. 먼저 초기화면을 구성하기 위해 서버에 요청을 보냅니다. 모든 페이지에 대한 동작을 담고있기 때문에 초기화면을 위한 데이터를 받는데 시간이 꽤 걸릴 수 있습니다. 이후에는 초기화면을 불러오면 클라이언트의 요청에 따라 필요한 부분만 응답 받아 렌더링합니다. 서버는 클라이언트의 요청에 따라 데이터를 보내고, 클라이언트가 이 데이터를 통해 화면을 구성합니다. 또한 CSR의 초기 HTML 문서는 비어있는 상태이기 때문에 검색 봇이 이에 정보가 없다 판단하여 검섹엔진 최적화(SEO)에 취약할 수 있고, 크롤링을 실패하는 경우가 생깁니다.
### CSR 장점
- 렌더링이 클라이언트에서 이루어져 서버 부하가 덜합니다. 
- 클라이언트의 요청에 따라 필요한 부분만 렌더링하기 때문에 빠른 인터렉션을 제공해줍니다.
- SSR에서 보이던 화면 전환 시 깜빡임이 없습니다.
### CSR 단점
- 처음에 불러와야 할 데이터가 크기에 초기 로딩 속도가 느립니다.
- SSR에 비해서 검섹엔진 최적화에 취약하여 검색 사이트에 잘 노출되지 않을 수 있습니다. 굳이 검색엔진에 노출되지 않아도 된다면 상관없겠지만.
- 렌더링 된 후에 크롤링이 제대로 되지 않는 경우에 크롤링이 잘 되지 않습니다. 마찬가지로 크롤링 되는걸 원하지 않는다면 상관 없음.
## 2. SPA(Single Page Application)로 구성된 웹 앱에서 SSR(Server-side Rendering)이 필요한 이유에 대하여 설명해주세요.
### SPA
SPA는 CSR으로 구성합니다. 최초에 페이지 전체를 로드하고, 이후 클라이언트의 요청으로 불러온 데이터를 바인딩하게 됩니다. CSR의 초기 HTML 문서는 비어있는 상태일 것이며 검색엔진 최적화에 취약할 것 입니다.
### SSR이 필요한 이유
결국엔 CSR의 대표적인 단점을 극복하기 위해 필요할겁니다. 클라이언트가 페이지에 진입했을 때 긴 로딩시간을 가지고 있다면 사용자가 이탈할것이고, 검색엔진 최적화가 잘 되지 않아 노출이 덜 된다면 사이트 이용에 불편함을 느낄 수 밖에 없을겁니다. 특정 검색 봇들은 SPA이라도 감지한다 하고, SPA이지만 검색엔진에 노출될 수 있도록 메타태그를 추가하는 등 미들웨어(helmet, meta 등)들이 있다고 하지만 한계가 있다고 생각합니다. 
## 3. Next.js 프로젝트에서 yarn start(or npm run start) 스크립트를 실행했을 때 실행되는 코드를 Next.js Github 레포지토리에서 찾은 뒤, 해당 파일에 대한 간단한 설명을 첨부해주세요.
### 실행되는 코드
- [https://github.com/vercel/next.js/blob/canary/packages/next/src/cli/next-start.ts](https://github.com/vercel/next.js/blob/canary/packages/next/src/cli/next-start.ts)
### 설명
- 먼저 알면 좋은 패키지가 있음 [https://github.com/vercel/arg](https://github.com/vercel/arg)
> `arg` is an unopinionated, no-frills CLI argument parser.
- 간단하게 CLI 분석기
- 인수를 두 개 사용하는데 요약하면 `arg(명령어 명세 객체, parse 옵션)`
  - parse 옵션 객체에 argv 속성이 들어가는데 여기에 CLI에서 받아온 arguments를 추가할 수 있음
```js
const arg = require('arg');
const args = arg({ 
  '--number': Number,
  '-h': Boolean,

  '--help': '-h',
  '-n': '--number'
});
```
- arg에 넣을 `명령어 명세 객체`를 생성함
- nextStart 함수 매개변수로 arguments를 받아옴
- args 변수를 생성함, 생성하다 에러가 발생하면 에러메시지 출력
```ts
const nextStart: CliCommand = async (argv) => {
  const validArgs: arg.Spec = {
    // Types
    '--help': Boolean,
    '--port': Number,
    '--hostname': String,
    '--keepAliveTimeout': Number,

    // Aliases
    '-h': '--help',
    '-p': '--port',
    '-H': '--hostname',
  }
  let args: arg.Result<arg.Spec>
  try {
    args = arg(validArgs, { argv })
  } catch (error) {
    if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
      return printAndExit(error.message, 1)
    }
    throw error
  }
  ...
}
```
- arguments가 `--help` 또는 `-h`이면 멘트 출력 후 종료
```ts
const nextStart: CliCommand = async (argv) => {
  ...
  if (args['--help']) {
    console.log(...)
    process.exit(0)
  }
  ...
}
```
- args 에서 
  - `명령어 명세 객체`에 포함되지 않은 arguments는 `_` 속성의 배열에 저장됨
  - `명령어 명세 객체`에 포함되는 arguments는 `argument 이름: 값` 형태로 저장됨
```js
const arg = require('arg');
const argv = [
	'--foo',
	'hello',
	'--bar',
	'12345',
	'abcde'
];
const args = arg({ '--foo': String }, { argv });
console.log(args) // => { _: ['--bar', '12345', 'abcde'], '--foo': 'hello' };
```
- 따라서 arguments의 처음은 경로를 가져오고, 나머지 host, port를 가져옴
```ts
const nextStart: CliCommand = async (argv) => {
  ...
  const dir = getProjectDir(args._[0])
  const host = args['--hostname']
  const port = getPort(args)
  ...
}
```
- `keepAliveTimeoutArg` 가 다음 조건에 만족하면 멘트 출력 후 종료
```ts
const nextStart: CliCommand = async (argv) => {
  ...
  const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
  if (
    typeof keepAliveTimeoutArg !== 'undefined' &&
    (Number.isNaN(keepAliveTimeoutArg) ||
      !Number.isFinite(keepAliveTimeoutArg) ||
      keepAliveTimeoutArg < 0)
  ) {
    printAndExit(
      `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
      1
    )
  }
  ...
}
```
- 마지막으로 keepAliveTimeout 과 config 를 생성하고 서버 시작
- keepAliveTimeout 변수는 keepAliveTimeoutArg가 argument로 들어왔다면 설정해주고
- config 변수를 생성해서 startServer 실행함
```ts
const nextStart: CliCommand = async (argv) => {
  ...
  const keepAliveTimeout = keepAliveTimeoutArg
    ? Math.ceil(keepAliveTimeoutArg)
    : undefined

  const config = await loadConfig(
    PHASE_PRODUCTION_SERVER,
    resolve(dir || '.'),
    undefined,
    undefined,
    true
  )

  await startServer({
    dir,
    isDev: false,
    hostname: host,
    port,
    keepAliveTimeout,
    useWorkers: !!config.experimental.appDir,
  })
}
```
