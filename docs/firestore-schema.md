# Firestore Schema

> Project: 나만의 경로 (My Route)
>
> Version: v1.0 (MVP)

---

# Overview

Firestore는 사용자별 데이터를 독립적으로 관리한다.

실시간 교통 데이터(버스 도착 정보, 버스 위치, 지하철 도착 정보)는 저장하지 않고 API 호출 시 계산한다.

---

# Design Principles

## Store

* User Profile
* User Settings
* Route Groups
* Routes
* Active Routes

## Do Not Store

* Real-time bus arrivals
* Real-time bus locations
* Real-time subway arrivals
* Transfer calculation results
* Estimated arrival results

---

# Collection Structure

```text
users
 └─ {uid}
      ├─ profile
      ├─ settings
      ├─ routeGroups
      │    └─ {groupId}
      │
      ├─ routes
      │    └─ {routeId}
      │
      └─ activeRoutes
           └─ {activeRouteId}
```

---

# User Profile

Path

```text
users/{uid}/profile/main
```

Document

```json
{
  "uid": "firebase_uid",
  "email": "user@example.com",
  "displayName": "홍길동",
  "photoUrl": "",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

---

# User Settings

Path

```text
users/{uid}/settings/preferences
```

Document

```json
{
  "walkingSpeed": "NORMAL",
  "preferredTransport": "BUS",
  "minimizeTransfers": true,
  "notificationsEnabled": true,
  "boardingAlarmEnabled": true,
  "transferAlarmEnabled": true
}
```

## Walking Speed

```text
SLOW
NORMAL
FAST
```

---

# Route Groups

사용자의 경로 그룹

예시

```text
출퇴근
운동
주말
```

Path

```text
users/{uid}/routeGroups/{groupId}
```

Document

```json
{
  "id": "group_commute",
  "name": "출퇴근",
  "color": "#FFD84D",
  "sortOrder": 1,
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

---

# Routes

실제 경로 데이터

Path

```text
users/{uid}/routes/{routeId}
```

Document

```json
{
  "id": "route_001",
  "groupId": "group_commute",
  "name": "출근 A",
  "description": "버스 + 지하철",
  "startName": "집",
  "endName": "회사",
  "isFavorite": true,
  "steps": [],
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

---

# Route Step Types

Route 내부의 steps 배열에 저장된다.

지원 타입

```text
WALK
BUS
SUBWAY
```

---

# WALK Step

```json
{
  "id": "step_walk_001",
  "type": "WALK",
  "from": {
    "name": "집",
    "lat": 37.497,
    "lng": 127.028
  },
  "to": {
    "name": "집앞정류장",
    "lat": 37.498,
    "lng": 127.029
  },
  "distanceMeter": 250,
  "estimatedMinutes": 3
}
```

---

# BUS Step

```json
{
  "id": "step_bus_001",
  "type": "BUS",
  "fromStation": {
    "stationId": "100000001",
    "stationName": "집앞정류장",
    "lat": 37.497,
    "lng": 127.028
  },
  "toStation": {
    "stationId": "100000002",
    "stationName": "강남역",
    "lat": 37.498,
    "lng": 127.031
  },
  "candidateRoutes": [
    {
      "routeId": "341",
      "routeName": "341"
    },
    {
      "routeId": "360",
      "routeName": "360"
    },
    {
      "routeId": "146",
      "routeName": "146"
    }
  ]
}
```

## Purpose

candidateRoutes는 다음 기능을 위해 사용한다.

```text
341 → 5분
360 → 2분
146 → 10분

→ 360 추천
```

---

# SUBWAY Step

```json
{
  "id": "step_subway_001",
  "type": "SUBWAY",
  "line": {
    "lineId": "2",
    "lineName": "2호선"
  },
  "fromStation": {
    "stationId": "gangnam",
    "stationName": "강남역"
  },
  "toStation": {
    "stationId": "seolleung",
    "stationName": "선릉역"
  }
}
```

---

# Route Example

```json
{
  "name": "출근 A",
  "startName": "집",
  "endName": "회사",
  "steps": [
    {
      "type": "WALK",
      "estimatedMinutes": 3
    },
    {
      "type": "BUS",
      "candidateRoutes": [
        {
          "routeId": "341",
          "routeName": "341"
        },
        {
          "routeId": "360",
          "routeName": "360"
        }
      ]
    },
    {
      "type": "WALK",
      "estimatedMinutes": 4
    },
    {
      "type": "SUBWAY",
      "line": {
        "lineId": "2",
        "lineName": "2호선"
      }
    },
    {
      "type": "WALK",
      "estimatedMinutes": 5
    }
  ]
}
```

---

# Active Routes

안내 시작 후 사용되는 데이터

Path

```text
users/{uid}/activeRoutes/{activeRouteId}
```

Document

```json
{
  "routeId": "route_001",
  "routeName": "출근 A",
  "currentStepIndex": 1,
  "status": "IN_PROGRESS",
  "startedAt": "Timestamp",
  "lastLocation": {
    "lat": 37.497,
    "lng": 127.028
  }
}
```

## Status

```text
READY
IN_PROGRESS
COMPLETED
CANCELLED
```

---

# Firestore Security Rules

원칙

사용자는 자신의 데이터만 읽고 수정할 수 있다.

Example

```javascript
match /users/{userId} {
  allow read, write:
    if request.auth != null
    && request.auth.uid == userId;
}
```

---

# Future Expansion

## V2

* TMAP 자동 경로 생성
* 경로 복제

## V3

* 승하차 알림
* 환승 알림
* 현재 위치 추적

## V4

* 경로 공유
* 공개 템플릿

## V5

* 커뮤니티 경로
* 인기 경로 추천

---

# Notes

1. Route Step은 별도 Collection으로 분리하지 않는다.
2. Route 문서 내부의 steps 배열로 관리한다.
3. 실시간 교통 데이터는 저장하지 않는다.
4. Route 조회 1회로 전체 경로를 가져올 수 있도록 설계한다.
5. MVP에서는 단순한 구조를 유지한다.
