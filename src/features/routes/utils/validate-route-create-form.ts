import type { RouteStep } from '../types';

export interface RouteCreateFormValidationInput {
  name: string;
  groupId: string | null;
  steps: RouteStep[];
}

export type RouteCreateFormValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export function validateRouteCreateForm(
  input: RouteCreateFormValidationInput,
): RouteCreateFormValidationResult {
  if (input.name.trim().length === 0) {
    return { ok: false, error: '경로 이름을 입력해 주세요.' };
  }

  if (input.groupId === null) {
    return { ok: false, error: '경로 그룹을 선택해 주세요.' };
  }

  if (input.steps.length === 0) {
    return { ok: false, error: '최소 1개 이상의 단계를 추가해 주세요.' };
  }

  return { ok: true };
}
