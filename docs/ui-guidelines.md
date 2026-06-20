# UI Guidelines

> Project: 나만의 경로 (My Route)
>
> Version: v2.0

---

# Design Vision

## Product Identity

나만의 경로는 단순한 지도 앱이 아니다.

사용자가 직접 만든 대중교통 경로를 저장하고,
실시간 교통 상황을 기반으로 최적의 경로를 추천하는
개인 이동 관리 앱이다.

---

## Design Goal

사용자는 앱 실행 후 3초 안에 다음 정보를 확인할 수 있어야 한다.

* 어떤 경로를 이용할지
* 버스가 언제 오는지
* 환승이 가능한지
* 언제 도착하는지

---

# Design Keywords

* Card Layout
* Route First
* Clear Hierarchy
* Timeline
* Blue Mobility
* Friendly Utility

---

# Design Principles

## DO

* 흰색 카드 + 연한 배경 (`#F8FAFC`) 레이어
* 예상 도착·버스 도착 시간 크게 표시
* 환승 상태는 연한 색 Status Pill
* 가로/세로 타임라인으로 경로 구조 표현
* 그룹 아코디언으로 경로 관리

## DO NOT

* 과도한 장식·그라디언트
* 보라색 계열
* 정보 없는 큰 여백

---

# Information Priority

모든 화면은 아래 순서를 따른다.

```text
버스 도착 시간

↓

예상 도착 시간

↓

환승 상태

↓

경로 세부 정보
```

---

# Inspiration

UI 참고

* 카카오버스
* 카카오지하철
* Google Maps Transit
* Citymapper

주의

UI 흐름은 참고하되
색상과 브랜드는 독립적으로 구성한다.

---

# Brand Colors

## Primary

브랜드 대표 컬러

```css
#2563EB
```

---

## Primary Dark

버튼 Pressed

```css
#1D4ED8
```

---

## Primary Light

선택 상태

```css
#DBEAFE
```

---

# Neutral Colors

## Background

```css
#FFFFFF
```

---

## Surface

```css
#F8FAFC
```

---

## Border

```css
#E2E8F0
```

---

## Text Primary

```css
#0F172A
```

---

## Text Secondary

```css
#64748B
```

---

## Surface Muted

화면 배경 (홈 등)

```css
#F1F5F9
```

---

## Transit Accent

버스 번호 강조

```css
#2563EB
```

---

## SAFE

```css
#16A34A
```

환승 가능

---

## WARNING

```css
#F59E0B
```

환승 촉박

---

## DANGER

```css
#DC2626
```

환승 실패 가능

---

## INFO

```css
#2563EB
```

실시간 정보

---

# Typography

## Font Family

Android

Pretendard

iOS

SF Pro

---

# Text Scale

## Display

```ts
fontSize: 32
fontWeight: "700"
```

사용

도착 시간

---

## Heading

```ts
fontSize: 24
fontWeight: "700"
```

사용

화면 제목

---

## Title

```ts
fontSize: 18
fontWeight: "600"
```

사용

카드 제목

---

## Body

```ts
fontSize: 16
fontWeight: "400"
```

---

## Caption

```ts
fontSize: 13
fontWeight: "400"
```

---

# Spacing

4px Grid System

```ts
4
8
12
16
20
24
32
40
48
64
```

---

# Radius

Small

```ts
8
```

Medium

```ts
12
```

Large

```ts
16
```

XL

```ts
24
```

---

# Shadows

매우 약하게 사용

```ts
shadowOpacity: 0.05
shadowRadius: 8
shadowOffset: {
  width: 0,
  height: 2
}
```

---

# Information Priority

모든 화면은 아래 순서를 따른다.

```text
현재 상태

↓

도착 정보

↓

환승 정보

↓

세부 정보
```

---

# Component Guidelines

# List Section

목적

리스트 그룹 제목 (회색 바)

```ts
paddingVertical: 8
paddingHorizontal: 16
background: #F1F5F9
fontSize: 13
```

---

# List Row

목적

정보 밀도 높은 단일 행

```ts
paddingVertical: 10
paddingHorizontal: 16
minHeight: 44
borderBottom: hairline
```

---

# Route Summary Row

목적

추천 경로 요약 — 예상 도착 우측 정렬, 환승 상태 인라인

---

# Bus Arrival Row

목적

버스 도착 정보 — 3열: 번호 | 정류장·위치 | 도착(크게)

```ts
busNumber: 20 bold #2563EB
arrival: 26 bold
meta: 12 secondary
```

---

목적

저장된 경로 요약

예시

```text
출근 A

집 → 회사

예상 도착
08:42

환승 1회
```

---

높이

```ts
100
```

---

Radius

```ts
16
```

---

# Bus Arrival Card

목적

버스 도착 정보 표시

예시

```text
341번

3분 후 도착
```

---

도착 시간은 가장 크게 표시

```ts
fontSize: 28
fontWeight: "700"
```

---

# Transfer Status Card

목적

환승 가능 여부 표시

SAFE

```text
🟢 환승 여유 5분
```

WARNING

```text
🟠 환승 여유 1분
```

DANGER

```text
🔴 환승 실패 가능
```

---

# Route Step Card

종류

* BUS
* SUBWAY
* WALK

예시

```text
🚌 341, 360

집앞정류장

↓

강남역
```

---

```text
🚶 도보

4분
```

---

```text
🚇 2호선

강남역

↓

선릉역
```

---

# Floating Action Button

위치

우측 하단

용도

경로 생성

크기

```ts
56
```

색상

Primary

---

# Bottom Navigation

항상 4개 탭

```text
홈
경로
지도
설정
```

---

높이

```ts
64
```

---

# Screen Guidelines

# Home Screen

구조

```text
헤더 (앱명 + 알림)

↓

인사

↓

현재 경로 카드 (도착·환승·미니 타임라인·안내 시작)

↓

추천 경로 (탭 + 카드 리스트)
```

---

# Routes Screen

구조

```text
헤더 (내 경로)

↓

그룹 아코디언 (출근 / 운동 / 기타)

  └ 경로 행 (기본 뱃지 · 도착 · 환승 상태)
```

---

# Route Detail Screen

구조

```text
헤더 (경로명 + 편집)

↓

도착·환승·통계 요약

↓

세로 타임라인 (버스 / 도보 / 지하철)

↓

하단 고정 [안내 시작]
```

---

# Navigation Screen

구조

```text
현재 단계 카드 (도착 시간 크게)

↓

다음 단계 타임라인
```

---

# Route List Screen

구조

```text
경로 그룹

↓

경로 목록

↓

경로 생성 버튼
```

---

# Route Detail Screen

구조

```text
경로 이름

↓

예상 도착

↓

환승 상태

↓

Step 목록

↓

안내 시작
```

---

# Navigation Screen

가장 중요한 화면

구조

```text
현재 단계

↓

도착 정보

↓

환승 상태

↓

다음 단계
```

예시

```text
341번 버스 탑승

3분 후 도착

환승 여유 5분

🟢 안전
```

---

# Empty State

예시

```text
아직 저장된 경로가 없습니다.

새로운 경로를 만들어보세요.
```

---

# Loading State

Spinner 사용 금지

Skeleton UI 사용

---

# Accessibility

최소 터치 영역

```ts
44 x 44
```

---

텍스트 대비

WCAG AA 이상

---

# Motion

Duration

```ts
150ms ~ 250ms
```

사용 가능

* Fade
* Slide
* Scale

사용 금지

* Bounce
* Flash
* 과도한 애니메이션

---

# Design Rule

지도는 보조 수단이다.

사용자가 가장 먼저 봐야 하는 것은

* 버스 도착 시간
* 예상 도착 시간
* 환승 가능 여부

이다.

모든 UI는 이를 최우선으로 설계한다.
