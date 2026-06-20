import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { RouteCreateBasicsSection } from '@/features/routes/components/RouteCreateBasicsSection';
import { RouteCreateStepAddBar } from '@/features/routes/components/RouteCreateStepAddBar';
import { RouteCreateStepItem } from '@/features/routes/components/RouteCreateStepItem';
import { useRouteGroupsQuery } from '@/features/routes/hooks';
import { useSaveRouteCreateForm } from '@/features/routes/hooks/useSaveRouteCreateForm';
import type { RouteStepType } from '@/features/routes/types';
import { goBackOrReplace } from '@/navigation/go-back-or-replace';
import { routeDetailHref, routesTabHref } from '@/navigation/paths';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';
import { useRouteCreateStore } from '@/store/route-create.store';

function FormDivider() {
  return <View style={styles.divider} />;
}

export function RouteCreateScreen() {
  const router = useRouter();
  const { data: groups = [] } = useRouteGroupsQuery();
  const { save, isSaving } = useSaveRouteCreateForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const name = useRouteCreateStore((state) => state.name);
  const groupId = useRouteCreateStore((state) => state.groupId);
  const steps = useRouteCreateStore((state) => state.steps);
  const setName = useRouteCreateStore((state) => state.setName);
  const setGroupId = useRouteCreateStore((state) => state.setGroupId);
  const addStep = useRouteCreateStore((state) => state.addStep);
  const removeStep = useRouteCreateStore((state) => state.removeStep);
  const moveStepUp = useRouteCreateStore((state) => state.moveStepUp);
  const moveStepDown = useRouteCreateStore((state) => state.moveStepDown);
  const resetForm = useRouteCreateStore((state) => state.resetForm);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (groupId !== null || groups.length === 0) {
      return;
    }

    setGroupId(groups[0].id);
  }, [groupId, groups, setGroupId]);

  const handleAddStep = (type: RouteStepType) => {
    addStep(type);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    setErrorMessage(null);
    const result = await save();

    if (!result.success) {
      setErrorMessage(result.error ?? '경로 저장에 실패했습니다.');
      return;
    }

    if (result.route) {
      router.replace(routeDetailHref(result.route.id));
      return;
    }

    goBackOrReplace(routesTabHref());
  };

  const handleBackPress = () => {
    goBackOrReplace(routesTabHref());
  };

  return (
    <ScreenLayout
      footer={
        <Button
          disabled={isSaving}
          label={isSaving ? '저장 중...' : '경로 저장'}
          onPress={handleSave}
          variant="fullWidth"
        />
      }
      style={styles.layout}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader onBackPress={handleBackPress} showRight={false} title="경로 만들기" />

        <Card style={styles.formCard} variant="subtle">
          <RouteCreateBasicsSection
            groups={groups}
            name={name}
            onGroupSelect={setGroupId}
            onNameChange={setName}
            selectedGroupId={groupId}
          />

          <FormDivider />

          <RouteCreateStepAddBar onAdd={handleAddStep} />

          <FormDivider />

          <View style={styles.stepsSection}>
            <Text style={styles.sectionLabel}>경로 단계</Text>
            {steps.length === 0 ? (
              <View style={styles.emptySteps}>
                <Text style={styles.emptyTitle}>아직 추가된 단계가 없습니다</Text>
                <Text style={styles.emptyDescription}>
                  도보, 버스, 지하철 단계를 추가하고 순서를 변경해 보세요.
                </Text>
              </View>
            ) : (
              <View style={styles.stepList}>
                {steps.map((step, index) => (
                  <RouteCreateStepItem
                    key={step.id}
                    index={index}
                    onMoveDown={() => moveStepDown(step.id)}
                    onMoveUp={() => moveStepUp(step.id)}
                    onRemove={() => removeStep(step.id)}
                    step={step}
                    totalCount={steps.length}
                  />
                ))}
              </View>
            )}
          </View>
        </Card>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  divider: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
  },
  emptyDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptySteps: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 12,
    gap: spacing.xs,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
  },
  emptyTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '600',
  },
  formCard: {
    gap: spacing.base,
    padding: spacing.base,
  },
  layout: {
    backgroundColor: colors.surfaceMuted,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepList: {
    gap: spacing.sm,
  },
  stepsSection: {
    gap: spacing.sm,
  },
});
