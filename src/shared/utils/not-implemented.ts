export function notImplemented(feature: string): never {
  throw new Error(`Not implemented: ${feature}`);
}
