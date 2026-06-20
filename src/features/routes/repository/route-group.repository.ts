import { mockRouteGroups } from '../types';
import { createMockRouteGroupRepository } from './mock.route-group.repository';

export const routeGroupRepository = createMockRouteGroupRepository(mockRouteGroups);
