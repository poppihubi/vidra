import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AddTaskForm } from '../components/AddTaskForm';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { colors } from '../theme';

export function TaskListScreen() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tarefas</Text>
      <Text style={styles.subheader}>Trabalho e vida pessoal, no mesmo lugar.</Text>
      <AddTaskForm onAdd={addTask} />
      <FlatList
        style={styles.list}
        data={tasks}
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
  empty: { textAlign: 'center', color: colors.textFaint, marginTop: 24 },
});
