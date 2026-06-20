export const routesMock = {
  groups: [
    {
      id: 'commute',
      name: '출근',
      defaultExpanded: true,
      routes: [
        {
          id: 'commute-a',
          name: '출근 A',
          pathLabel: '집 → 회사',
          estimatedArrival: '08:42',
          isDefault: true,
          transferStatus: 'SAFE' as const,
          transferStatusLabel: '5분 안전',
        },
        {
          id: 'return',
          name: '퇴근',
          pathLabel: '회사 → 집',
          estimatedArrival: '18:20',
          transferStatus: 'SAFE' as const,
          transferStatusLabel: '7분 안전',
        },
      ],
    },
    {
      id: 'exercise',
      name: '운동',
      routes: [
        {
          id: 'gym',
          name: '헬스장',
          pathLabel: '집 → 헬스장',
          estimatedArrival: '19:05',
        },
      ],
    },
    {
      id: 'other',
      name: '기타',
      routes: [
        {
          id: 'weekend',
          name: '주말',
          pathLabel: '집 → 카페',
          estimatedArrival: '14:30',
        },
      ],
    },
  ],
};
