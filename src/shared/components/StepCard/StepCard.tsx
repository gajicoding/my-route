import { StyleSheet, Text } from 'react-native';

import { Card } from '@/shared/components/Card';
import { colors, typography } from '@/shared/theme';

export interface StepCardProps {
  title: string;
  subtitle?: string;
}

export function StepCard({ title, subtitle }: StepCardProps) {
  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
});
