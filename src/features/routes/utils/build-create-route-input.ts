import type { CreateRouteInput, RouteStep } from '../types';
import { isWalkStep } from '../types';

export interface RouteCreateFormValues {
  name: string;
  groupId: string;
  steps: RouteStep[];
}

function deriveStartName(steps: RouteStep[]): string {
  const firstStep = steps[0];

  if (firstStep && isWalkStep(firstStep)) {
    return firstStep.from.name;
  }

  return '출발';
}

function deriveEndName(steps: RouteStep[]): string {
  const lastStep = steps[steps.length - 1];

  if (lastStep && isWalkStep(lastStep)) {
    return lastStep.to.name;
  }

  return '도착';
}

export function buildCreateRouteInput(values: RouteCreateFormValues): CreateRouteInput {
  return {
    groupId: values.groupId,
    name: values.name.trim(),
    description: '',
    startName: deriveStartName(values.steps),
    endName: deriveEndName(values.steps),
    steps: values.steps,
  };
}
