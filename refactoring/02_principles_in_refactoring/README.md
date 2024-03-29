# 2. 리팩터링 원칙
## 2.1 리팩터링 정의
- **리팩터링 refactoring**: 소프트웨어의 동작은 유지한 채 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법
- **재구성 restructuring**: 코드베이스를 정리하거나 구조를 바꾸는 모든 작업
- 리팩터링하기 전과 후의 코드가 똑같이 동작해야 한다. (겉보기 동작 observable behavior이 같아야 한다.)
- **함수 추출하기**를 거치면서 콜스택이 달라져 성능이 변할 수 있더라도 사용자 관점에서는 달라진 점이 없어야 한다.
- 리팩터링 과정에서 발견된 버그는 리팩터링 후에도 그대로 남아있어야 한다.
- 리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다.
  - 성능은 좋아질 수도 나빠질 수도 있다.
- 성능 최적화는 오로지 속도 개선에만 신경을 쓰기 때문에 코드는 다루기에 더 어렵게 바뀔 수도 있음을 각도해야한다.
## 2.2 두 개의 모자
- 개발 목적이 **기능 추가**냐, **리팩터링**이냐를 명확히 구분해 작업한다.
- **기능 추가** 시 기존 코드는 절대 건드리지 않고 새 기능을 추가하기만 한다.
- **리팩터링** 시 기능 추가는 절대 하지 않고 코드 재구성에만 전념한다.
## 2.3 리팩터링하는 이유
- 리팩터링하면 소프트웨어 설계가 좋아진다
- 리팩터링하면 소프트웨어를 이해하기 쉬워진다.
- 리팩터링하면 버그를 쉽게 찾을 수 있다.
- 리팩터링하면 프로그래밍 속도를 높일 수 있다.
  - 내부 설계가 잘 된 소프트웨어는 새로운 기능의 추가가 쉽고 고치기 쉽다.
  - 코드가 명확하면 버그를 만들 가능성도 줄고, 디버깅하기가 훨씬 쉽다.
## 2.4 언제 리팩터링해야 할까?
- **준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기**
  - 리팩터링하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다.
  - **함수 매개변수화하기(11.2)**
  - 오류를 일으키는 코드가 여러 곳에 복제되어 퍼져있다면 한 곳으로 합치는 편이 작업하기에 훨씬 편하다.
  - 질의 코드에 섞여 있는 갱신 로직을 분리하면 두 작업이 꼬여서 생기는 오류를 크게 줄일 수 있다.
  - 버그가 수정된 상태가 오래 지속될 가능성을 높이는 동시에, 같은 곳에서 다른 버그가 발생할 가능성을 줄일 수 있다.
- **이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기**
  - 코드의 의도가 더 명확하게 드러나도록 한다.
  - 조건부 로직의 구조가 이상하지 않은지 살펴보고, 함수와 변수 이름이 이해되는지 살펴보며 함수를 잘게 나눈다.
  - 코드를 분석할 때 리팩터링을 해보면 더 깊은 수준까지 이해하게 된다.
- **쓰레기 줍기 리팩터링**
  - 일을 비효율적으로 처리하는 모습을 발견할 때
  - 로직이 쓸데없이 복잡한 경우
  - 매개변수화한 함수 하나면 될 일을 똑같은 함수 여러 개로 작성해놓은 경우 
  - 원래 하려던 작업과 관련 없는 일에 너무 많은 시간을 빼앗기는 경우
- **계획된 리팩터링과 수시로 하는 리팩터링**
  - 기능을 추가하거나 버그를 수정할 때 리팩터링을 한다.
  - 리팩터링은 앞으로 할 작업에도 도움을 준다.
  - 보기 싫은 코드를 발견하면 리팩터링하자. 잘 작성된 코드 역시 수많은 리팩터링을 거쳐야 한다.
  - 무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고 그 다음에 수정하자
  - 새 기능을 추가하기 쉽도록 코드를 '수정'하는 것이 그 기능을 가장 빠르게 추가하는 길일 수 있다.
  - 리팩터링에 소홀했다면 시간을 내서 코드베이스를 개선할 필요가 있다.
  - 리팩터링 커밋을 분리한다고 해서 무조건 좋은 것은 아니다.
- **오래 걸리는 리팩터링**
  - 라이브러리를 교체하거나, 타른 팀과 공유를 위해 컴포넌트로 빼내는 작업, 또는 의존성 정리 작업 등
  - 리팩터링이 코드를 깨트리지 않는다는 장점을 활용하자. 일부를 변경해도 모든 기능이 항상 올바르게 동작한다.
  - 기존 코드가 추상 인터페이스를 호출하도록 만들고 나면 라이브러리를 쉽게 교체할 수 있다. (Branch By Abstraction)
- **코드 리뷰에 리팩터링 활용하기**
  - 내 눈에는 명확한 코드가 남들에게는 그렇지 않을 수 있다.
  - 다른 이의 코드 리뷰에 도움이 된다.
  - 코드 리뷰의 결과를 더 구체적으로 도출할 때 도움이 된다.
- **관리자에게는 뭐라고 말해야 할까?**
  - 새로운 기능을 빠르게 구현하는 것 그 가장 빠른 방법은 리팩터링 (물론 상황에 따라 고려해볼 점이 많음)
- **리팩터링하지 말아야 할 때**
  - 지저분한 코드를 발견해도 굳이 수정할 필요가 없다면 리팩터링하지 않는다.
  - 내부 동작을 이해해야 할 시점에 리팩터링해야 효과를 제대로 볼 수 있다.
  - 직접 리팩터링해보기 전에는 처음부터 새로 작성하는 게 쉬워보이더라도 확실히 알 수 없다.
## 2.5 리팩터링 시 고려할 문제
- **새 기능 개발 속도 저하**
  - 리팩터링의 궁극적인 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것
  - 기능 추가 시간을 줄이고 버그 수정 시간을 줄여준다 이를 모두가 인식할 수 있도록 
- **코드 소유권**
  - 코드 소유권이 나뉘어 있으면 리팩터링에 방해된다.
  - 각자가 책임지는 영역을 관리하자.
- **브랜치**
  - 버전 관리 시스템을 사용하여 팀원마다 코드베이스의 브랜치를 하나씩 맡아 작업하고, 겨로가물이 쌓이면 마스터 브랜치에 통합하여 다른 팀원과 공유한다.
  - 독립 브랜치로 작업하는 기간이 길어질수록 작업 결과를 마스터로 통합하기가 어려워진다.
  - 머지가 복잡해지는 문제는 기능별 브랜치들이 독립적으로 개발되는 기간이 길어질수록 기하급수적으로 늘어난다.
  - 지속적 통합(Continuous Integration), 트렁크 기반 개발(Trunk-Based Development)을 통해 머지의 복잡도를 낮춘다.
  - 물론 단점도 있음, 마스터를 건강하게 유지하고, 기능을 잘게 쪼개는 법을 배우고, 각 기능을 끌 수 있는 기능 토글을 적용하는 등
  - CI와 리팩터링을 합쳐서 eXtreme Programming
- **테스팅** 
  - 절차를 지켜 제대로 리팩터링하면 동작이 깨지지 않아야 한다.
  - 리팩터링은 단계별 변경 폭이 작아서 도중 발생한 오류의 원인이 될만한 코드 범위가 넓지 않다. 오류를 빨리 잡을 수 있다.
  - 리팩터링을 위해서는 자가 테스트 코드를 마련해야 한다.
  - 테스트는 새 기능 추가도 훨씬 안전하게 진행할 수 있도록 도와준다.
  - 안전한 자동 리팩터링을 활용한다면 테스트 없이 리팩터링해도 좋다.
  - CI에 통합된 테스트는 XP의 권장사항이고, 지속적 배포(Continous Delivery)의 핵심이다.
- **레거시 코드**
  - 레거시 코드는 대체로 복잡하고 테스트도 갖춰지지 않은 경우가 많고, 다른 사람이 작성한 코드다.
  - 레거시 시스템을 파악하는데 리팩터링이 도움된다. 테스트를 보강하자.
  - 테스트를 염두에 두고 설계한 시스템은 쉽게 테스트할 수 있다.
  - '프로그램에서 테스트를 추가할 틈새를 찾아서 시스템을 테스트해야 한다.' - 레거시 코드 활욕 전략
  - 서로 관련된 부분끼리 나눠서 하나씩. 코드의 한 부분을 훑고 넘어갈 때마다 예전보다 조금이라도 개선하려고 노력한다.
- **데이터베이스**
  - `진화형 데이터베이스 설계`와 `데이터베이스 리팩터링 기법`
  - 커다란 변경들을 쉽게 조합하고 다룰 수 있는 데이터 마이그레이션 스크립트를 작성한다.
  - 접근 코드와 데이터베이스 스키마에 대한 구조적 변경을 이 스크립트로 처리하게끔 통합한다.
    - ex) 예전 필드를 사용하는 데이터 모두가 새 필드를 사용하도록 변환해야 하는 부담은 크다.
    - 변환을 수행하는 코드를 간단히 작성한 다음, 선언된 데이터 구조나 접근 루틴을 변경하는 코드와 함께 버전 관리 시스템에 저장한다. 
    - 데이터베이스를 다른 버전으로 이전할 때마다 현재 버전에서 원하는 버전 사이에 있는 모든 마이그레이션 스크립트를 실행한다.
  - 전체 변경 과정을 작고 독립된 단계들로 쪼개는 것이 핵심
  - 데이터베이스 리팩터링은 프로덕션 환경에 여러 단계로 나눠서 릴리스하는 것이 대체로 좋다는 점에서 다른 리팩터링과 다르다.
    - ex) 필드 이름을 바꾸려고 한다면 첫 번째 커밋에서 새로운 데이터베이스 필드를 추가만 하고 사용하지는 않는다.
    - 기존 필드와 새 필드를 동시에 업데이트하도록 설정한다.
    - 데이터베이스를 읽는 클라이언트들을 새 필드를 사용하는 버전으로 조금씩 교체한다.
    - 교체 작업이 끝났다면 필요없어진 예전 필드를 삭제한다. `병렬수정`
## 2.6 리팩터링, 아키텍처, 애그니(YAGNI)
- 리팩터링이 아키텍처에 미치는 실질적인 효과는 요구사항 변화에 자연스럽게 대응하도록 코드베이스를 잘 설계해준다는 데 있다. 
- 아키텍처를 확정지으려 할 때 요구사항을 사전에 모두 파악해야 한다고 생각하지만 실현할 수 없는 목표일 때가 많다.
- 향후 변경에 유연하게 대처할 수 있는 유연성 메커니즘(flexibility mechanism)을 소프트웨어에 심어두는 것.
  - ex) 범용적으로 사용할 수 있겠다 싶은 함수 등 예상 시나리오에 대응하기 위한 매개변수 추가 등
  - 물론 쓰임에 비해 함수가 복잡해지거나 새로 추가하기가 더 어려워지는 등 문제가 발생하기도 한다.
  - 모든 상황을 고려하다 보면 유연성 메커니즘이 오히려 변화에 대응하는 능력을 떨어뜨릴 때가 대부분이다.
- 리팩터링을 활용한 접근 (간결한 설계, 점진적 설계, You Aren't Going to Need It 애그니)
  - 어느 부분에 유연성이 필요하고 어떻게 해야 그 변화에 가장 잘 대응할 수 있을지 추측하지 않고, 현재까지 파악한 요구사항만을 해결하는 소프트웨어를 구축한다. 이 요구를 멋지게 해결하도록 설계한다.
  - 사용자의 요구사항을 더 잘 이해하게 되면 아키텍처도 그에 맞게 리팩터링해서 바꾼다
  - 그 과정에서 소프트웨어 복잡도에 지장을 주지 않는 메커니즘은 마음껏 추가한다.
  - 복잡도를 높일 수 있는 유연성 메커니즘은 반드시 검증을 거친 후 추가한다.
  - 호출하는 측에서 항상 같은 값을 넘기는 매개변수는 매개변수 목록에 넣지 않는다.
  - 매개변수를 추가해야 할 시점이 오면 **함수 매개변수화하기(11.2)**로 해결한다.
  - 리팩터링을 미루면 훨씬 힘들어진다는 확신이 들 때만 유연성 메커니즘을 미리 추가한다.
- **YAGNI**는 아키텍처를 전혀 고려하지 않는 것이 아닌 아키텍처와 설계를 개발 프로세스에 녹이는 또 다른 방식이다.
- 선제적인 아키텍처에 소홀해도 된다는 뜻이 아닌, 균형점이 달라진다는 의미.
## 2.7 리팩터링과 소프트웨어 개발 프로세스
- 리팩터링이 퍼지기 시작한 것은 익스트림 프로그래밍의 도입
- 익스트림 프로그래밍은 애자일 소프트웨어 방법론 중 하나로 등장함
- 지속적 통합, 자가 테스트 코드, 리팩터링 등 기법들을 하나로 묶은 프로세스
- 자가 테스트 코드와 리펙터링을 묶어 TDD 테스트 주도 개발이라고 한다.
## 2.8 리팩터링과 성능
- 직관적인 설계 vs 성능
- 리팩터링을 하면 소프트웨어가 느려질 수도 있지만, 동시에 성능을 튜닝하기 쉬워진다.
- 빠른 소프트웨어 작성하는 방법
  - 시간 예산 분배 방식, 하드 리얼타임 시스템에서 많이 사용
  - 끊임없이 관심 기울이기
  - 의도적으로 성능 최적화에 돌입하기 전까지는 성능에 신경 쓰지 않고 코드를 다루기 쉽게 만드는데 집중한다.
- 대부분 프로그램은 전체 코드 중 극히 일부에서 대부분의 시간을 소비한다.
- 프로파일러로 프로그램을 분석하여 시간과 공간을 많이 잡아먹는 지점을 알아내고 성능에 큰 영향을 주는 작은 부분을 찾아 개선한다.
- 리팩터링을 잘 해두었다면 
  - 성능 튜닝에 투입할 시간을 벌 수 있다.
  - 기능 추가가 빨리 끝나서 성능에 집중할 시간을 더 벌 수 있다.
  - 성능을 더 세밀하게 분석할 수 있다.
- 단기적으로 본다면 성능이 느려질 수 있지만 결국에는 더 빠른 소프트웨어를 얻게 된다.
## 2.9 리팩터링의 유래
## 2.10 리팩터링 자동화
- 리팩터링을 자동화하는 가장 어슬픈 방법은 소스 코드의 텍스트를 직접 조작하는 것
- 자동 리팩터링을 제대로 구현하려면 코드를 구문(syntax) 트리로 해석해서 다뤄야 한다.
- 리팩터링 도구들은 안전하고 편하며 강력하지만 맹신하지 않고 테스트로 확인하는 것이 바람직하다.
## 2.11 더 알고 싶다면
