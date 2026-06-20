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

* Transit First
* Information First
* Fast
* Clean
* Reliable
* Blue Mobility
* Familiar UX

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

## Disabled

```css
#CBD5E1
```

---

# Status Colors

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

# Route Card

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
인사

↓

추천 경로

↓

최근 사용 경로

↓

실시간 버스 정보
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
