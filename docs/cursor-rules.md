# Cursor Rules

> Project: 나만의 경로 (My Route)

이 문서는 Cursor AI가 프로젝트 내 코드를 생성할 때 반드시 따라야 하는 규칙을 정의한다.

---

# General Rules

## Rule 1

항상 TypeScript Strict Mode 기준으로 작성한다.

절대 any를 사용하지 않는다.

❌

```ts
const data: any
```

✅

```ts
const data: Route
```

---

## Rule 2

타입을 먼저 정의한 후 구현한다.

모든 도메인 객체는 TypeScript 타입을 가진다.

예시

```ts
export interface Route {
  id: string;
  name: string;
  steps: RouteStep[];
}
```

---

## Rule 3

함수는 하나의 책임만 가진다.

❌

```ts
async function loadData() {
  fetchRoutes();
  calculateArrival();
  updateUI();
}
```

✅

```ts
fetchRoutes();

calculateArrival();

updateUI();
```

---

# Architecture Rules

## Feature Based Architecture

반드시 Feature 중심 구조를 사용한다.

```text
features/
├─ auth
├─ route-groups
├─ routes
├─ transit
├─ navigation
└─ settings
```

---

## Shared Code

공통 코드는 shared에 위치한다.

```text
shared/
├─ components
├─ hooks
├─ utils
├─ constants
├─ theme
└─ types
```

---

## Screen Rules

Screen은 UI 역할만 수행한다.

Screen에서 직접 API를 호출하지 않는다.

❌

```ts
const routes = await firestore.getRoutes();
```

✅

```ts
const { data } = useRoutesQuery();
```

---

# Firestore Rules

## Direct Access 금지

Component 또는 Screen에서 Firestore를 직접 호출하지 않는다.

반드시 Repository를 사용한다.

❌

```ts
getDocs(collection(db, "routes"));
```

✅

```ts
routeRepository.getRoutes();
```

---

## Repository Pattern

모든 Firestore 접근은 Repository Layer에서 수행한다.

```text
repository/
└─ route.repository.ts
```

예시

```ts
routeRepository.createRoute();

routeRepository.updateRoute();

routeRepository.deleteRoute();

routeRepository.getRouteById();
```

---

## Collection Names

Collection 이름은 camelCase를 사용한다.

✅

```text
routeGroups
activeRoutes
```

❌

```text
route_groups
ActiveRoutes
```

---

# React Rules

## Functional Components Only

Class Component 사용 금지

✅

```tsx
export function HomeScreen() {
  return <View />;
}
```

---

## Default Export 금지

항상 Named Export 사용

❌

```ts
export default HomeScreen;
```

✅

```ts
export function HomeScreen() {}
```

---

## Props Interface 사용

모든 컴포넌트는 Props Interface를 정의한다.

```ts
interface RouteCardProps {
  route: Route;
}
```

---

# State Management Rules

## Zustand Only

전역 상태는 Zustand만 사용한다.

Redux 사용 금지

MobX 사용 금지

---

## Store 역할

Store에는 UI 상태만 저장한다.

저장 가능

* 로그인 상태
* 사용자 정보
* 현재 실행 경로
* 설정

저장 금지

* 버스 도착 정보
* 서버 데이터

---

# TanStack Query Rules

## Server State

서버 데이터는 Query로 관리한다.

예시

```ts
useRoutesQuery();

useRouteQuery();

useBusArrivalQuery();
```

---

## Query Key

Query Key는 배열로 작성한다.

✅

```ts
["routes"]

["route", routeId]

["busArrival", stationId]
```

---

## Mutation

생성/수정/삭제는 Mutation 사용

```ts
useCreateRouteMutation();

useUpdateRouteMutation();

useDeleteRouteMutation();
```

---

# Styling Rules

## StyleSheet 사용

반드시 React Native StyleSheet 사용

styled-components 사용 금지

---

## Hardcoded Color 금지

❌

```ts
color: "#FFD84D"
```

✅

```ts
color: colors.primary
```

---

## Theme 사용

```ts
import { colors } from "@/shared/theme";
```

---

# Naming Rules

## Components

PascalCase

```text
RouteCard
TransferBadge
BusArrivalCard
```

---

## Hooks

use 접두사 사용

```text
useRoutesQuery
useBusArrival
useCurrentLocation
```

---

## Store

store suffix 사용

```text
auth.store.ts

route.store.ts

settings.store.ts
```

---

## Repository

repository suffix 사용

```text
route.repository.ts

group.repository.ts
```

---

# Folder Rules

Feature 내부 구조

```text
feature-name/

├─ screens
├─ components
├─ hooks
├─ repository
├─ services
├─ types
└─ utils
```

---

# Error Handling

모든 비동기 코드는 try/catch 사용

```ts
try {
  await createRoute();
} catch (error) {
  handleError(error);
}
```

---

# Logging Rules

개발 환경

```ts
console.log()
```

허용

운영 환경

```ts
console.log()
```

금지

---

# Performance Rules

FlatList 사용

ScrollView 남용 금지

---

React.memo 적극 사용

---

불필요한 re-render 방지

---

Firestore 읽기 최소화

---

# Route Domain Rules

Route는 항상 steps 배열을 가진다.

```ts
interface Route {
  id: string;
  steps: RouteStep[];
}
```

---

RouteStep Type

```ts
type RouteStepType =
  | "WALK"
  | "BUS"
  | "SUBWAY";
```

---

BUS Step은 항상 candidateRoutes를 가진다.

```ts
candidateRoutes: BusRoute[]
```

---

# Forbidden

절대 사용 금지

* any
* Class Component
* Redux
* Direct Firestore Access
* Inline Business Logic
* Default Export
* Hardcoded Colors

---

# Goal

모든 코드는

* 타입 안정성
* 유지보수성
* 확장성
* 테스트 가능성

을 최우선으로 작성한다.

---

# Git Commit Messages

커밋 메시지는 Conventional Commits 제목 + scope별 본문 불릿으로 작성한다.

## 형식

```text
<type>: <한 줄 요약>

- <scope>: <변경 내용>
- <scope>: <변경 내용>
```

## type

`feat` · `fix` · `refactor` · `docs` · `chore` · `test` · `style`

## scope

프로젝트 경로·모듈·훅·문서명을 사용한다.

예: `features/routes`, `services/firebase`, `docs/prd`, `useRouteDetail`

관련 scope가 여러 개면 한 불릿에 쉼표로 나열한다.

## 규칙

* 제목·본문은 한국어 (기술 용어는 영어 허용)
* 제목은 커밋 전체를 한 줄로 요약
* 본문은 변경 영역(scope)마다 1불릿, 무엇을 바꿨는지만 기술
* 한 커밋 = 하나의 논리적 변경

## 예시

```text
feat: 경로 상세 화면 및 Route Repository read 추가

- features/routes: RouteDetailScreen, useRouteDetail hook 추가
- features/routes/repository: route.repository.ts 단건·목록 조회 구현
- services/firebase: Firestore 초기화 및 firestore.ts 연결
- types/route: Route, RouteStep 타입 정의
```
