import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AddTaskForm } from '../components/AddTaskForm';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';

export function TaskListScreen() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Suas tarefas</Text>
      <AddTaskForm onAdd={addTask} />
      <FlatList
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
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#222' },
  empty: { textAlign: 'center', color: '#999', marginTop: 24 },
});
