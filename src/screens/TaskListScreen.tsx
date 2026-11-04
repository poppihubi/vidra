import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AddTaskForm } from '../components/AddTaskForm';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { AREA_LABELS, areaOf, TaskArea } from '../types/task';
import { colors, radius } from '../theme';

type Filter = 'all' | TaskArea;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'work', label: AREA_LABELS.work },
  { key: 'personal', label: AREA_LABELS.personal },
];

export function TaskListScreen() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? tasks : tasks.filter((t) => areaOf(t) === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tarefas</Text>
      <Text style={styles.subheader}>Trabalho e vida pessoal, no mesmo lugar.</Text>
      <AddTaskForm onAdd={addTask} />
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable
            key={f.key}
            onPress={() => setFilter(f.key)}
            style={[styles.filter, filter === f.key && styles.filterActive]}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        style={styles.list}
        data={visible}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onRemove={removeTask} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa ainda — adicione a primeira acima.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.bg },
  list: { flex: 1 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },
  subheader: { fontSize: 13, color: colors.textMuted, marginBottom: 14 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 13, color: colors.textMuted },
  filterTextActive: { color: '#fff', fontWeight: '700' },
  empty: { textAlign: 'center', color: colors.textFaint, marginTop: 24 },
});
