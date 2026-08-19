import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { QUADRANT_LABELS, QUADRANT_ORDER } from '../types/task';

export function MatrixScreen() {
  const { tasks, toggleTask, removeTask } = useTasks();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>Matriz de Eisenhower</Text>
      {QUADRANT_ORDER.map((q) => {
        const items = tasks.filter((t) => t.quadrant === q && !t.completed);
        return (
          <View key={q} style={styles.quadrant}>
            <Text style={styles.quadrantTitle}>{QUADRANT_LABELS[q].title}</Text>
            <Text style={styles.quadrantHint}>{QUADRANT_LABELS[q].hint}</Text>
            {items.length === 0 ? (
              <Text style={styles.empty}>Nada aqui.</Text>
            ) : (
              items.map((t) => (
                <TaskItem key={t.id} task={t} onToggle={toggleTask} onRemove={removeTask} />
              ))
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#222' },
  quadrant: { marginBottom: 20 },
  quadrantTitle: { fontSize: 15, fontWeight: '700', color: '#333' },
  quadrantHint: { fontSize: 12, color: '#888', marginBottom: 8 },
  empty: { fontSize: 12, color: '#aaa', fontStyle: 'italic', marginBottom: 4 },
});
