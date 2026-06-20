import { StyleSheet, Text, View } from 'react-native';

import { ListRow } from '@/shared/components/ListRow';
import { colors, spacing, typography } from '@/shared/theme';

export interface BusArrivalCardProps {
  routeName: string;
  arrivalMessage: string;
  stopName?: string;
  stopsAwayLabel?: string;
  showDivider?: boolean;
}

export function BusArrivalCard({
  routeName,
  arrivalMessage,
  stopName,
  stopsAwayLabel,
  showDivider = true,
}: BusArrivalCardProps) {
  const meta = [stopName, stopsAwayLabel].filter(Boolean).join(' · ');

  return (
    <ListRow showDivider={showDivider}>
      <View style={styles.row}>
        <Text style={styles.routeName}>{routeName}</Text>

        <View style={styles.info}>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>

        <Text style={styles.arrival}>{arrivalMessage}</Text>
      </View>
    </ListRow>
  );
}

const styles = StyleSheet.create({
  arrival: {
    ...typography.busArrival,
    color: colors.textPrimary,
    minWidth: 72,
    textAlign: 'right',
  },
  info: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  meta: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  routeName: {
    ...typography.busNumber,
    color: colors.busNumber,
    minWidth: 40,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
