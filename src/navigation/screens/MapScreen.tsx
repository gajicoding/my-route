import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { routeDetailHref } from '@/navigation/paths';
import { Card } from '@/shared/components/Card';
import { ScreenHeader } from '@/shared/components/ScreenHeader';
import { ScreenLayout } from '@/shared/components/ScreenLayout';
import { StatusPill } from '@/shared/components/StatusPill';
import { layout } from '@/shared/constants';
import { colors, radius, spacing, typography } from '@/shared/theme';

import { mapMock } from './map.mock';

export function MapScreen() {
  const router = useRouter();
  const { currentRoute } = mapMock;

  return (
    <ScreenLayout edges={['top']} style={styles.layout}>
      <View style={styles.header}>
        <ScreenHeader showRight={false} title="지도" />
      </View>

      <View style={styles.mapArea}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapIconWrap}>
            <Ionicons color={colors.textSecondary} name="map-outline" size={28} />
          </View>
          <Text style={styles.mapHint}>경로가 지도에 표시됩니다</Text>
        </View>

        {mapMock.markers.map((marker) => (
          <View
            key={marker.id}
            style={[
              styles.marker,
              marker.type === 'start' && styles.markerStart,
              marker.type === 'end' && styles.markerEnd,
              marker.type === 'bus' && styles.markerBus,
              marker.type === 'transfer' && styles.markerTransfer,
            ]}
          >
            <View style={styles.markerDot} />
          </View>
        ))}
      </View>

      <View style={styles.bottomPanel}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(routeDetailHref(currentRoute.routeId))}
        >
          <Card style={styles.routeCard} variant="subtle">
            <Text style={styles.routeLabel}>현재 경로</Text>
            <Text style={styles.routePath}>{currentRoute.pathLabel}</Text>

            <View style={styles.statsPanel}>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{currentRoute.name}</Text>
                <StatusPill
                  label={currentRoute.transferStatusLabel}
                  status={currentRoute.transferStatus}
                />
              </View>

              <View style={styles.statDivider} />

              <View style={styles.arrivalBlock}>
                <Text style={styles.arrivalLabel}>예상 도착</Text>
                <Text style={styles.arrival}>{currentRoute.estimatedArrival}</Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  arrival: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.6,
    lineHeight: 30,
    marginTop: 2,
  },
  arrivalBlock: {
    alignItems: 'flex-end',
    flex: 1,
  },
  arrivalLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  bottomPanel: {
    paddingBottom: spacing.base,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
  },
  header: {
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  layout: {
    backgroundColor: colors.surface,
  },
  mapArea: {
    flex: 1,
    marginHorizontal: layout.screenPaddingHorizontal,
    marginTop: spacing.sm,
    position: 'relative',
  },
  mapHint: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.sm,
  },
  mapIconWrap: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  mapPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
  },
  marker: {
    position: 'absolute',
  },
  markerBus: {
    left: '30%',
    top: '45%',
  },
  markerDot: {
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: 8,
    borderWidth: 2,
    height: 14,
    width: 14,
  },
  markerEnd: {
    bottom: '18%',
    right: '22%',
  },
  markerStart: {
    left: '18%',
    top: '22%',
  },
  markerTransfer: {
    right: '28%',
    top: '38%',
  },
  routeCard: {
    gap: spacing.sm,
    padding: spacing.base,
  },
  routeInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  routeLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  routeName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  routePath: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  statDivider: {
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    width: StyleSheet.hairlineWidth,
  },
  statsPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
});
