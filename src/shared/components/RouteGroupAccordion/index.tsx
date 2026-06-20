import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/shared/components/Card';
import { StatusPill } from '@/shared/components/StatusPill';
import { colors, radius, spacing, typography } from '@/shared/theme';
import type { TransferStatus } from '@/shared/types';

export interface RouteGroupRoute {
  id: string;
  name: string;
  pathLabel: string;
  estimatedArrival?: string;
  isDefault?: boolean;
  transferStatus?: TransferStatus;
  transferStatusLabel?: string;
}

export interface RouteGroupAccordionProps {
  groupName: string;
  routes: RouteGroupRoute[];
  defaultExpanded?: boolean;
  onRoutePress?: (routeId: string) => void;
}

export function RouteGroupAccordion({
  groupName,
  routes,
  defaultExpanded = false,
  onRoutePress,
}: RouteGroupAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Card style={styles.card} variant="subtle">
      <Pressable
        accessibilityRole="button"
        onPress={() => setExpanded((prev) => !prev)}
        style={styles.header}
      >
        <View>
          <Text style={styles.groupName}>{groupName}</Text>
          <Text style={styles.routeCount}>{routes.length}개 경로</Text>
        </View>
        <Ionicons
          color={colors.textSecondary}
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
        />
      </Pressable>

      {expanded ? (
        <View style={styles.routeList}>
          {routes.map((route, index) => (
            <Pressable
              key={route.id}
              accessibilityRole="button"
              onPress={() => onRoutePress?.(route.id)}
              style={[styles.routeRow, index > 0 && styles.routeRowBorder]}
            >
              <View style={styles.routeInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  {route.isDefault ? (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeLabel}>기본</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.pathLabel}>{route.pathLabel}</Text>
                <View style={styles.metaRow}>
                  {route.estimatedArrival ? (
                    <Text style={styles.arrivalMeta}>도착 {route.estimatedArrival}</Text>
                  ) : null}
                  {route.transferStatus && route.transferStatusLabel ? (
                    <StatusPill label={route.transferStatusLabel} status={route.transferStatus} />
                  ) : null}
                </View>
              </View>
              <Ionicons color={colors.disabled} name="chevron-forward" size={16} />
            </Pressable>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  arrivalMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  card: {
    gap: 0,
    overflow: 'hidden',
    padding: 0,
  },
  defaultBadge: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  defaultBadgeLabel: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  groupName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pathLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  routeCount: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  routeInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  routeList: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  routeName: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  routeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  routeRowBorder: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
