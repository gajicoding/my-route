import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/shared/theme';

export type RouteTimelineStepType = 'BUS' | 'WALK' | 'SUBWAY';

export interface RouteTimelineStepData {
  id: string;
  type: RouteTimelineStepType;
  timeLabel: string;
  title: string;
  subtitle?: string;
  highlight?: string;
  isActive?: boolean;
  isLast?: boolean;
}

const stepIcons: Record<RouteTimelineStepType, keyof typeof Ionicons.glyphMap> = {
  BUS: 'bus-outline',
  WALK: 'walk-outline',
  SUBWAY: 'subway-outline',
};

export interface RouteTimelineProps {
  steps: RouteTimelineStepData[];
}

export function RouteTimeline({ steps }: RouteTimelineProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={step.id} style={styles.stepRow}>
            <Text style={styles.time}>{step.timeLabel}</Text>

            <View style={styles.track}>
              <View
                style={[
                  styles.dot,
                  step.isActive && styles.dotActive,
                  step.type === 'BUS' && styles.dotBus,
                  step.type === 'SUBWAY' && styles.dotSubway,
                ]}
              >
                <Ionicons
                  color={step.isActive ? colors.background : colors.primary}
                  name={stepIcons[step.type]}
                  size={14}
                />
              </View>
              {!isLast ? <View style={styles.line} /> : null}
            </View>

            <View style={styles.content}>
              <Text style={[styles.title, step.isActive && styles.titleActive]}>{step.title}</Text>
              {step.subtitle ? <Text style={styles.subtitle}>{step.subtitle}</Text> : null}
              {step.highlight ? (
                <Text style={styles.highlight}>{step.highlight}</Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  dot: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotBus: {
    backgroundColor: colors.primaryLight,
  },
  dotSubway: {
    backgroundColor: colors.primaryLight,
  },
  highlight: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  line: {
    backgroundColor: colors.border,
    flex: 1,
    marginVertical: 4,
    width: 2,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    paddingTop: 6,
    width: 40,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  titleActive: {
    color: colors.primary,
  },
  track: {
    alignItems: 'center',
    width: 32,
  },
});
