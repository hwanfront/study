# CAP 이론 
repli분산 데이터베이스 시스템은 파티션이 발생하면 세 가지 속성 중 두 가지만 만족할 수 있다는 것을 의미합니다. [Replication](./09_replication_sharding.md#replication)같은 master-slave 관계에서 발생하는 문제입니다. 앞에서 설명했듯이 master-slave 구조는 DB가 항상 사용가능하게 하려면 master의 read가 replica에 적용되게 하려면 시간이 필요하고, 시차 문제로 인해 항상 일관성을 가지기 어렵게 됩니다. 따라서 [여러가지 이유](https://www.youtube.com/watch?v=hUd_9FENShA)로 네트워크 파티션이 없는 분산 시스템을 가정할 수 없으므로 `CP` 또는 `AP` 둘 중 하나만 만족할 수 있습니다.
- `일관성 Consistency` DB들이 똑같은 데이터를 가지고있는지
- `가용성 Availability` DB들이 항상 사용가능한지
- `파티션 허용성 Partition torlerance` DB들 중 하나가 고장나거나 사용하지 못해도 정상 작동하는지
## 한계
CAP 이론에 따르면 분산 시스템은 CP 이거나 AP 여야 합니다. 완벽한 CP 시스템은 가용성 뿐만 아니라 성능도 희생해야 하며 완벽한 AP 시스템은 일관성이 깨지더라도 응답을 하기만 한다면 가용성을 갖게 되는 것이므로 좋다고 할 순 없습니다. 또한 파티션이 없는 상황을 설명할 수 없습니다. 
## PACELC 이론
PACELC 이론은 CAP 이론의 단점을 보완하기 위해 나온 이론입니다. 
# BASE 이론
- `**B**asically **A**vailable` Consistency가 완벽하진 않아도 어느정도 Availability 데이터를 요청하면 기본적으로 접근 가능합니다.
- `**S**oft State 독립성` Consistency가 완벽하진 않지만 부족한 Consistency는 개발자가 어느정도 극복합니다.
- `**E**ventually Consistency` 일정 시간이 경과하면 모든 분산된 데이터의 Consistency를 채웁니다.
## ACID
Consistency를 중요하게 여기며 TRANSACTION를 통해서 Consistency 를 최대한 맞춥니다. TRANSACTION을 자주하면 LOCK, ISOLATION 문제로 Availability 가 떨어집니다. Consistency를 100%로 맞추기 위해 Availability를 낮추는 방법입니다.