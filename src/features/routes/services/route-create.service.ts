import { routeRepository } from '../repository';
import type { CreateRouteInput, Route } from '../types';

const MOCK_SAVE_DELAY_MS = 600;

export async function mockSaveRoute(input: CreateRouteInput): Promise<Route> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, MOCK_SAVE_DELAY_MS);
  });

  return routeRepository.createRoute(input);
}
