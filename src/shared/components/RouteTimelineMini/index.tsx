import Ionicons from '@expo/vector-icons/Ionicons';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/shared/theme';

export type TimelineStepType = 'BUS' | 'WALK' | 'SUBWAY';

export interface TimelineMiniStep {
  type: TimelineStepType;
  title?: string;
  label: string;
  lineNumber?: string;
  highlight?: boolean;
}

const stepIcons: Record<TimelineStepType, keyof typeof Ionicons.glyphMap> = {
  BUS: 'bus-outline',
  WALK: 'walk-outline',
  SUBWAY: 'subway-outline',
};

const ICON_SIZE = 28;

export interface RouteTimelineMiniProps {
  steps: TimelineMiniStep[];
  showTrack?: boolean;
}

export function RouteTimelineMini({ steps, showTrack = false }: RouteTimelineMiniProps) {
  return (
    <View style={styles.wrapper}>
      {showTrack ? <View pointerEvents="none" style={styles.trackLine} /> : null}
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {steps.map((step, index) => (
          <Fragment key={`${step.type}-${index}`}>
            {index > 0 ? <View style={styles.gap} /> : null}
            <View style={styles.step}>{renderStep(step)}</View>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

function renderStep(step: TimelineMiniStep) {
  if (step.type === 'BUS') {
    return (
      <>
        <View style={[styles.iconWrap, styles.busIconWrap]}>
          <Ionicons color={colors.primary} name={stepIcons.BUS} size={14} />
        </View>
        {step.title ? <Text style={styles.stepTitle}>{step.title}</Text> : null}
        <Text
          numberOfLines={2}
          style={[styles.stepLabel, step.highlight && styles.highlightLabel]}
        >
          {step.label}
        </Text>
      </>
    );
  }

  if (step.type === 'SUBWAY') {
    return (
      <>
        <View style={[styles.iconWrap, styles.subwayIconWrap]}>
          <Text style={styles.lineNumber}>{step.lineNumber ?? '2'}</Text>
        </View>
        <Text numberOfLines={2} style={styles.stepLabel}>
          {step.label}
        </Text>
      </>
    );
  }

  return (
    <>
      <View style={[styles.iconWrap, styles.walkIconWrap]}>
        <Ionicons color={colors.textSecondary} name={stepIcons.WALK} size={14} />
      </View>
      <Text numberOfLines={2} style={styles.stepLabel}>
        {step.label}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  busIconWrap: {
    backgroundColor: colors.background,
    borderColor: colors.primaryLight,
    borderWidth: 2,
  },
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  gap: {
    width: spacing.sm,
  },
  highlightLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE,
    zIndex: 1,
  },
  lineNumber: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
  step: {
    alignItems: 'center',
    gap: 4,
    maxWidth: 78,
    minWidth: 68,
  },
  stepLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    textAlign: 'center',
  },
  stepTitle: {
    ...typography.caption,
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  subwayIconWrap: {
    backgroundColor: colors.safe,
  },
  trackLine: {
    backgroundColor: colors.border,
    height: 2,
    left: spacing.base,
    position: 'absolute',
    right: spacing.base,
    top: spacing.xs + ICON_SIZE / 2 - 1,
  },
  walkIconWrap: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
  },
  wrapper: {
    position: 'relative',
  },
});
