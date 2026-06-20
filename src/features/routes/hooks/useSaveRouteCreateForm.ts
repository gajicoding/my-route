import { useCallback, useState } from 'react';

import { useRouteCreateStore } from '@/store/route-create.store';

import { mockSaveRoute } from '../services/route-create.service';
import type { Route } from '../types';
import { buildCreateRouteInput } from '../utils/build-create-route-input';
import { validateRouteCreateForm } from '../utils/validate-route-create-form';

export interface SaveRouteCreateFormResult {
  success: boolean;
  route?: Route;
  error?: string;
}

export function useSaveRouteCreateForm() {
  const name = useRouteCreateStore((state) => state.name);
  const groupId = useRouteCreateStore((state) => state.groupId);
  const steps = useRouteCreateStore((state) => state.steps);
  const resetForm = useRouteCreateStore((state) => state.resetForm);
  const [isSaving, setIsSaving] = useState(false);

  const save = useCallback(async (): Promise<SaveRouteCreateFormResult> => {
    const validation = validateRouteCreateForm({ name, groupId, steps });

    if (!validation.ok) {
      return { success: false, error: validation.error };
    }

    const selectedGroupId = groupId;
    if (selectedGroupId === null) {
      return { success: false, error: '경로 그룹을 선택해 주세요.' };
    }

    setIsSaving(true);

    try {
      const route = await mockSaveRoute(
        buildCreateRouteInput({
          name,
          groupId: selectedGroupId,
          steps,
        }),
      );

      resetForm();
      return { success: true, route };
    } catch (error) {
      const message = error instanceof Error ? error.message : '경로 저장에 실패했습니다.';
      return { success: false, error: message };
    } finally {
      setIsSaving(false);
    }
  }, [groupId, name, resetForm, steps]);

  return {
    save,
    isSaving,
  };
}
