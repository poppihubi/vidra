import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AREA_LABELS, areaOf, Task } from '../types/task';
import { colors, radius } from '../theme';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TaskItem({ task, onToggle, onRemove }: Props) {
  const area = areaOf(task);
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.checkboxArea}>
        <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, task.completed && styles.titleDone]}>
            {task.title}
          </Text>
          <Text
            style={[styles.areaTag, { color: area === 'work' ? colors.primary : colors.personal }]}
          >
            {AREA_LABELS[area]}
          </Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
        </View>
      </Pressable>
      <Pressable onPress={() => onRemove(task.id)} hitSlop={8}>
        <Text style={styles.remove}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  checkboxArea: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textFaint,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 15, color: colors.text },
  titleDone: { textDecorationLine: 'line-through', color: colors.textFaint },
  areaTag: { fontSize: 11, marginTop: 2, fontWeight: '600' },
  description: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  remove: { fontSize: 16, color: colors.textFaint, paddingHorizontal: 6 },
});
