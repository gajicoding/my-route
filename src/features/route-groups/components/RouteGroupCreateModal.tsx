import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useCreateRouteGroupMutation, useRouteGroupsQuery } from '@/features/routes/hooks';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { layout } from '@/shared/constants';
import { colors, radius, shadows, spacing, typography } from '@/shared/theme';

const presetColors = ['#FFD84D', '#2563EB', '#16A34A', '#F59E0B', '#DC2626'] as const;

export interface RouteGroupCreateModalProps {
  visible: boolean;
  onClose: () => void;
}

export function RouteGroupCreateModal({ visible, onClose }: RouteGroupCreateModalProps) {
  const { data: groups = [] } = useRouteGroupsQuery();
  const createGroupMutation = useCreateRouteGroupMutation();
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(presetColors[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setName('');
    setSelectedColor(presetColors[0]);
    setErrorMessage(null);
  }, [visible]);

  const handleCreate = async () => {
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setErrorMessage('그룹 이름을 입력해 주세요.');
      return;
    }

    setErrorMessage(null);

    try {
      await createGroupMutation.mutateAsync({
        name: trimmedName,
        color: selectedColor,
        sortOrder: groups.length + 1,
      });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : '그룹 생성에 실패했습니다.';
      setErrorMessage(message);
    }
  };

  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="닫기" onPress={onClose} style={styles.backdrop} />

        <View style={styles.sheet}>
          <Text style={styles.title}>그룹 만들기</Text>

          <Input onChangeText={setName} placeholder="예: 출퇴근" value={name} />

          <View style={styles.colorField}>
            <Text style={styles.fieldLabel}>색상</Text>
            <View style={styles.colorRow}>
              {presetColors.map((color) => {
                const isSelected = color === selectedColor;

                return (
                  <Pressable
                    key={color}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color },
                      isSelected && styles.colorSwatchSelected,
                    ]}
                  />
                );
              })}
            </View>
          </View>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <View style={styles.actions}>
            <Button
              disabled={createGroupMutation.isPending}
              label={createGroupMutation.isPending ? '만드는 중...' : '만들기'}
              onPress={handleCreate}
              variant="fullWidth"
            />

            <Pressable accessibilityRole="button" onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelLabel}>취소</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
    width: '100%',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  cancelButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    width: '100%',
  },
  cancelLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  colorField: {
    gap: spacing.sm,
    width: '100%',
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  colorSwatch: {
    borderRadius: radius.xl,
    height: 32,
    width: 32,
  },
  colorSwatchSelected: {
    borderColor: colors.textPrimary,
    borderWidth: 2,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    fontWeight: '600',
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  sheet: {
    alignItems: 'stretch',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    maxWidth: 420,
    padding: spacing.lg,
    width: '100%',
    zIndex: 1,
    ...shadows.soft,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    width: '100%',
  },
});
