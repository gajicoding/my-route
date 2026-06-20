export const navigationMock = {
  currentStep: {
    title: '341번 버스 탑승',
    subtitle: '집앞정류장',
    arrivalMessage: '3분 후 도착',
    scheduledTime: '08:00 탑승',
    transferStatus: 'SAFE' as const,
    transferStatusLabel: '환승 여유 5분',
  },
  nextSteps: [
    {
      id: 'walk-1',
      type: 'WALK' as const,
      timeLabel: '08:16',
      title: '도보 4분',
      subtitle: '강남역까지 280m',
    },
    {
      id: 'subway-1',
      type: 'SUBWAY' as const,
      timeLabel: '08:20',
      title: '2호선 탑승',
      subtitle: '강남역 → 선릉역',
    },
  ],
};
