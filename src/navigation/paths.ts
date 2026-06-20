import type { Href } from 'expo-router';

export function routeDetailHref(routeId: string): Href {
  return {
    pathname: '/routes/[routeId]',
    params: { routeId },
  };
}

export function navigationHref(routeId: string): Href {
  return {
    pathname: '/navigation/[routeId]',
    params: { routeId },
  };
}
