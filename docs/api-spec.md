# API Specification

> Project: 나만의 경로 (My Route)
>
> Version: v1.0

---

# Overview

앱은 다음 데이터 소스를 사용한다.

## External APIs

* 서울시 버스 API
* 공공데이터포털 API
* TMAP API (Future)

## Internal APIs

* Firebase Cloud Functions

---

# API Design Principles

## Rule 1

외부 API 응답을 UI에서 직접 사용하지 않는다.

❌

```ts
const arrivalTime = response.msgBody.itemList[0].arrmsg1;
```

✅

```ts
const arrivals = mapBusArrivalResponse(response);
```

---

## Rule 2

모든 외부 API 응답은 Domain Model로 변환한다.

Flow

```text
External API

↓

DTO

↓

Mapper

↓

Domain Model

↓

UI
```

---

## Rule 3

Screen은 API 구조를 알면 안 된다.

Screen은 Domain Model만 사용한다.

---

# Domain Models

## BusArrival

```ts
export interface BusArrival {
  routeId: string;
  routeName: string;

  arrivalMessage: string;

  arrivalSeconds: number;

  stationId: string;

  isLastBus: boolean;
}
```

---

## BusRoute

```ts
export interface BusRoute {
  routeId: string;
  routeName: string;
}
```

---

## Station

```ts
export interface Station {
  stationId: string;

  stationName: string;

  lat: number;

  lng: number;
}
```

---

## TransferResult

```ts
export interface TransferResult {
  canTransfer: boolean;

  marginMinutes: number;

  status:
    | "SAFE"
    | "WARNING"
    | "DANGER";
}
```

---

# Seoul Bus API

## Purpose

정류장 도착 정보 조회

---

## Endpoint

Firebase Function을 통해 호출

```text
App

↓

Firebase Function

↓

Seoul Bus API
```

---

## App Endpoint

```text
GET /bus-arrivals
```

Parameters

```ts
{
  stationId: string;
}
```

---

## Response

```ts
BusArrival[]
```

Example

```json
[
  {
    "routeId": "341",
    "routeName": "341",
    "arrivalMessage": "3분 후 도착",
    "arrivalSeconds": 180,
    "stationId": "100000001",
    "isLastBus": false
  }
]
```

---

# Route Recommendation API

## Purpose

저장된 경로 중 최적 경로 추천

---

## Endpoint

```text
POST /route/recommend
```

Request

```json
{
  "routeIds": [
    "route_001",
    "route_002",
    "route_003"
  ]
}
```

---

## Response

```json
{
  "recommendedRouteId": "route_002",
  "estimatedMinutes": 42
}
```

---

# Transfer Calculation API

## Purpose

환승 가능 여부 계산

---

## Endpoint

```text
POST /transfer/check
```

Request

```json
{
  "currentArrivalTime": "08:15",

  "walkingMinutes": 4,

  "nextBusArrivalTime": "08:20"
}
```

---

## Response

```json
{
  "canTransfer": true,
  "marginMinutes": 1,
  "status": "WARNING"
}
```

---

# Future APIs

## TMAP Route Search

Purpose

자동 경로 생성

---

Endpoint

```text
POST /route/search
```

Request

```json
{
  "startLat": 37.497,
  "startLng": 127.028,

  "endLat": 37.565,
  "endLng": 126.978
}
```

---

Response

```json
{
  "routes": []
}
```

---

# Firebase Functions

## Naming Convention

```text
getBusArrivals

recommendRoute

checkTransfer

searchTransitRoute
```

---

# DTO Structure

## Example

External API Response

```json
{
  "arrmsg1": "3분 후 도착",
  "rtNm": "341",
  "stId": "100000001"
}
```

---

DTO

```ts
export interface BusArrivalDto {
  arrmsg1: string;
  rtNm: string;
  stId: string;
}
```

---

Mapper

```ts
export function mapBusArrivalDto(
  dto: BusArrivalDto
): BusArrival {
  return {
    routeId: dto.rtNm,
    routeName: dto.rtNm,

    arrivalMessage: dto.arrmsg1,

    stationId: dto.stId,

    arrivalSeconds:
      parseArrivalMessage(dto.arrmsg1),

    isLastBus: false
  };
}
```

---

# Query Keys

## Routes

```ts
["routes"]
```

---

## Route Detail

```ts
["route", routeId]
```

---

## Route Groups

```ts
["routeGroups"]
```

---

## Bus Arrival

```ts
["busArrival", stationId]
```

---

## Recommendation

```ts
["routeRecommendation"]
```

---

# Error Format

모든 API는 동일한 에러 구조를 사용한다.

```ts
export interface ApiError {
  code: string;

  message: string;
}
```

Example

```json
{
  "code": "BUS_API_ERROR",
  "message": "버스 정보를 불러올 수 없습니다."
}
```

---

# Cache Strategy

## Bus Arrival

```text
30 seconds
```

---

## Route

```text
5 minutes
```

---

## Route Groups

```text
10 minutes
```

---

# Security

API Key는 앱에 저장하지 않는다.

항상 Firebase Functions에서 호출한다.

```text
App

↓

Firebase Function

↓

External API
```

---

# Goal

모든 외부 API는

DTO → Mapper → Domain Model

구조를 유지한다.

UI는 Domain Model만 사용한다.
