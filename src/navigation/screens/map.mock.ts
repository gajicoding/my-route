export const mapMock = {
  currentRoute: {
    routeId: 'commute-a',
    name: '출근 A',
    pathLabel: '집 → 회사',
    estimatedArrival: '08:42',
    transferStatus: 'SAFE' as const,
    transferStatusLabel: '5분 안전',
  },
  markers: [
    { id: 'home', label: '집', type: 'start' as const },
    { id: 'bus-stop', label: '집앞정류장', type: 'bus' as const },
    { id: 'transfer', label: '강남역', type: 'transfer' as const },
    { id: 'office', label: '회사', type: 'end' as const },
  ],
};
