export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export async function getCurrentLocation(): Promise<LocationCoordinates> {
  throw new Error('Not implemented');
}
