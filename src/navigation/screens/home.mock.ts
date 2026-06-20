export const homeMock = {
  greeting: '안녕하세요! 오늘도 안전하게 이동하세요',
  currentRoute: {
    name: '출근 A',
    pathLabel: '집 → 회사',
    estimatedArrival: '08:42',
    transferStatus: 'SAFE' as const,
    transferMarginMinutes: 5,
    timelineSteps: [
      {
        type: 'BUS' as const,
        title: '341, 360',
        label: '3분 후 도착',
        highlight: true,
      },
      {
        type: 'WALK' as const,
        label: '도보 4분',
      },
      {
        type: 'SUBWAY' as const,
        lineNumber: '2',
        label: '2호선 8분 후 도착',
      },
      {
        type: 'WALK' as const,
        label: '도보 5분',
      },
    ],
  },
  recommendTabs: [
    { value: 'today' as const, label: '오늘' },
    { value: 'weekday-am' as const, label: '평일 아침' },
    { value: 'weekday-pm' as const, label: '평일 저녁' },
  ],
  recommendedRoutes: {
    today: [
      {
        id: 'commute-b',
        name: '출근 B',
        description: '지하철 우선',
        durationLabel: '45분',
        transferCount: 1,
        transferStatus: 'SAFE' as const,
        transferStatusLabel: '7분 안전',
      },
      {
        id: 'commute-c',
        name: '출근 C',
        description: '버스 + 지하철',
        durationLabel: '49분',
        transferCount: 2,
      },
    ],
    'weekday-am': [
      {
        id: 'commute-a',
        name: '출근 A',
        description: '341 → 2호선',
        durationLabel: '42분',
        transferCount: 1,
        transferStatus: 'SAFE' as const,
        transferStatusLabel: '5분 안전',
      },
    ],
    'weekday-pm': [
      {
        id: 'return',
        name: '퇴근',
        description: '회사 → 집',
        durationLabel: '38분',
        transferCount: 0,
      },
    ],
  },
};

export type HomeRecommendTab = keyof typeof homeMock.recommendedRoutes;
