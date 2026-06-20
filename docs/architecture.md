# Architecture

> Project: 나만의 경로 (My Route)
>
> Version: v1.0

---

# Overview

나만의 경로는 사용자가 직접 만든 대중교통 경로를 저장하고 관리하는 React Native 기반 모바일 앱이다.

실시간 교통 정보는 외부 API에서 조회하며, 사용자 데이터는 Firebase Firestore에 저장한다.

---

# Tech Stack

## Mobile

* React Native
* Expo
* TypeScript

## State Management

* Zustand

## Server State

* TanStack Query

## Backend

* Firebase Authentication
* Firestore
* Firebase Cloud Functions

## Map

* Kakao Map SDK

## Transit APIs

* 서울시 버스 API
* 공공데이터포털 API

---

# Architecture Principles

## 1. Feature Based Structure

기능 중심 구조를 사용한다.

도메인별로 기능을 분리한다.

예시

```text
features/
├─ auth
├─ route-groups
├─ routes
├─ navigation
├─ transit
└─ settings
```

---

## 2. UI와 비즈니스 로직 분리

Screen은 데이터 요청을 직접 수행하지 않는다.

Screen
→ Hook
→ Service
→ Firebase/API

구조를 사용한다.

---

## 3. Firestore 접근 분리

Firestore 접근 코드는 Repository Layer에서만 수행한다.

Screen 또는 Component에서 Firestore를 직접 호출하지 않는다.

---

## 4. Type First Development

모든 데이터 모델은 TypeScript 타입을 먼저 정의한다.

예시

```ts
type Route = {
  id: string;
  name: string;
  steps: RouteStep[];
};
```

---

# Folder Structure

```text
src
│
├─ app
│
├─ navigation
│
├─ features
│   ├─ auth
│   ├─ route-groups
│   ├─ routes
│   ├─ navigation
│   ├─ transit
│   └─ settings
│
├─ shared
│   ├─ components
│   ├─ hooks
│   ├─ constants
│   ├─ utils
│   ├─ theme
│   └─ types
│
├─ services
│   ├─ firebase
│   ├─ transit
│   └─ location
│
├─ store
│
└─ config
```

---

# Feature Structure

예시

```text
features/routes

├─ screens
├─ components
├─ hooks
├─ services
├─ repository
├─ types
└─ utils
```

---

# Firebase Layer

## Firebase Services

```text
services/firebase

├─ auth.ts
├─ firestore.ts
└─ functions.ts
```

Firebase SDK 초기화만 담당한다.

---

# Repository Layer

예시

```text
features/routes/repository
```

```text
route.repository.ts
```

책임

* Route 조회
* Route 생성
* Route 수정
* Route 삭제

예시

```ts
routeRepository.getRoutes()

routeRepository.getRoute(routeId)

routeRepository.createRoute(data)
```

---

# Service Layer

비즈니스 로직 처리

예시

```text
features/routes/services
```

```ts
route.service.ts
```

예시

```ts
calculateEstimatedArrival()

calculateTransferMargin()

recommendBestRoute()
```

---

# State Management

## Zustand

클라이언트 상태 관리

관리 대상

* 로그인 상태
* 사용자 정보
* 현재 경로 실행 상태
* 설정 정보

예시

```text
store

├─ auth.store.ts
├─ route.store.ts
└─ settings.store.ts
```

---

# Server State

## TanStack Query

서버 데이터 조회

사용 대상

* Route 조회
* Route Group 조회
* 버스 도착 정보 조회

예시

```ts
useRoutesQuery()

useRouteQuery(routeId)

useBusArrivalQuery(stationId)
```

---

# Route Flow

```text
Screen

↓

Query Hook

↓

Repository

↓

Firestore
```

예시

```text
RouteListScreen

↓

useRoutesQuery()

↓

RouteRepository

↓

Firestore
```

---

# Transit Flow

```text
Screen

↓

Transit Query

↓

Transit Service

↓

Bus API
```

예시

```text
RouteDetailScreen

↓

useBusArrivalQuery()

↓

Transit Service

↓

Seoul Bus API
```

---

# Location Flow

```text
Device GPS

↓

Location Service

↓

Navigation Feature

↓

UI Update
```

---

# Shared Components

재사용 가능한 컴포넌트

```text
shared/components

├─ Button
├─ Card
├─ Loading
├─ EmptyState
├─ RouteCard
├─ StepCard
└─ TransferBadge
```

---

# Theme Structure

```text
shared/theme

├─ colors.ts
├─ spacing.ts
├─ typography.ts
└─ index.ts
```

---

# Error Handling

모든 API 호출은 try/catch 처리

사용자에게는 Toast 또는 Alert 표시

예시

```ts
try {
  await repository.createRoute(data);
} catch (error) {
  showErrorMessage();
}
```

---

# Logging

개발 환경

```ts
console.log()
```

사용 가능

운영 환경

```ts
console.log()
```

사용 금지

Crashlytics 도입 예정

---

# Performance Rules

1. Firestore 읽기 최소화
2. Route 상세는 1회 조회
3. 실시간 데이터는 Query Cache 사용
4. 불필요한 Re-render 방지
5. FlatList 사용

---

# MVP Scope

포함

* 로그인
* Route Group
* Route CRUD
* Bus Arrival 조회
* Route 추천

제외

* 음성 안내
* 백그라운드 위치 추적
* 위젯
* 공유 기능

---

# Future Architecture

V2

* TMAP 자동 경로 생성

V3

* 승하차 알림

V4

* 백그라운드 위치 추적

V5

* 경로 공유

V6

* 공개 템플릿 마켓
