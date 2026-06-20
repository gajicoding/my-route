export const routeDetailMock = {
  name: '출근 A',
  pathLabel: '집 → 회사',
  estimatedArrival: '08:42',
  transferStatus: 'SAFE' as const,
  transferStatusLabel: '환승 여유 5분 · 안전',
  stats: {
    totalMinutes: 42,
    transferCount: 1,
    walkMinutes: 9,
  },
  steps: [
    {
      id: 'bus-1',
      type: 'BUS' as const,
      timeLabel: '08:00',
      title: '341, 360번 버스',
      subtitle: '집앞정류장 → 강남역',
      highlight: '3분 후 도착',
      isActive: true,
    },
    {
      id: 'walk-1',
      type: 'WALK' as const,
      timeLabel: '08:16',
      title: '도보',
      subtitle: '280m · 4분',
    },
    {
      id: 'subway-1',
      type: 'SUBWAY' as const,
      timeLabel: '08:20',
      title: '2호선',
      subtitle: '강남역 → 선릉역 · 8분 · 5정거장',
    },
  ],
};
