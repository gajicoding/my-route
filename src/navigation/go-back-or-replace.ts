import type { Href } from 'expo-router';
import { router } from 'expo-router';

export function goBackOrReplace(fallbackHref: Href): void {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace(fallbackHref);
}
