import { StyleSheet, Text, TextInput, View } from 'react-native';

import { RouteGroupPicker } from '@/features/routes/components/RouteGroupPicker';
import type { RouteGroup } from '@/features/routes/types';
import { colors, radius, spacing, typography } from '@/shared/theme';

export interface RouteCreateBasicsSectionProps {
  name: string;
  groups: RouteGroup[];
  selectedGroupId: string | null;
  onNameChange: (name: string) => void;
  onGroupSelect: (groupId: string) => void;
}

export function RouteCreateBasicsSection({
  name,
  groups,
  selectedGroupId,
  onNameChange,
  onGroupSelect,
}: RouteCreateBasicsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>경로 이름</Text>
        <TextInput
          onChangeText={onNameChange}
          placeholder="예: 출근 A"
          placeholderTextColor={colors.textSecondary}
          style={styles.nameInput}
          value={name}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>그룹</Text>
        <RouteGroupPicker groups={groups} onSelect={onGroupSelect} selectedGroupId={selectedGroupId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.base,
  },
  field: {
    gap: spacing.sm,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  nameInput: {
    ...typography.body,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    color: colors.textPrimary,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
});
