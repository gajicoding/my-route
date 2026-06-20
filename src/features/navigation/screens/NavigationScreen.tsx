import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/shared/components/Card';
import { RouteTimeline } from '@/shared/components/RouteTimeline';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { StatusPill } from '@/shared/components/StatusPill';
import type { NavigationParams } from '@/navigation/types';
import { layout } from '@/shared/constants';
import { colors, spacing, typography } from '@/shared/theme';

import { navigationMock } from './navigation.mock';

export function NavigationScreen() {
  const router = useRouter();
  useLocalSearchParams<NavigationParams>();
  const { currentStep, nextSteps } = navigationMock;

  return (
    <ScreenLayout>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          onBackPress={() => router.back()}
          showRight={false}
          title="안내 중"
        />

        <Card style={styles.currentCard} variant="elevated">
          <Text style={styles.stepLabel}>현재 단계</Text>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          <Text style={styles.stepSubtitle}>{currentStep.subtitle}</Text>
          <Text style={styles.arrival}>{currentStep.arrivalMessage}</Text>
          <Text style={styles.scheduled}>{currentStep.scheduledTime}</Text>
          <StatusPill label={currentStep.transferStatusLabel} status={currentStep.transferStatus} />
        </Card>

        <View style={styles.nextSection}>
          <Text style={styles.sectionTitle}>다음 단계</Text>
          <RouteTimeline steps={nextSteps} />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  arrival: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 40,
    marginTop: spacing.md,
  },
  content: {
    gap: layout.sectionGap,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  currentCard: {
    gap: spacing.xs,
    padding: layout.cardPadding,
  },
  nextSection: {
    gap: spacing.md,
  },
  scheduled: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  stepLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 15,
  },
  stepTitle: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
});
