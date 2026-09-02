import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TaskListScreen } from '../screens/TaskListScreen';
import { MatrixScreen } from '../screens/MatrixScreen';
import { RecapScreen } from '../screens/RecapScreen';
import { EnergyDashboardScreen } from '../screens/EnergyDashboardScreen';

type Tab = 'tasks' | 'matrix' | 'energy' | 'recap';

const TABS: { key: Tab; label: string }[] = [
  { key: 'tasks', label: 'Tarefas' },
  { key: 'matrix', label: 'Matriz' },
  { key: 'energy', label: 'Energia' },
  { key: 'recap', label: 'Recap' },
];

export function RootTabs() {
  const [tab, setTab] = useState<Tab>('tasks');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tab === 'tasks' && <TaskListScreen />}
        {tab === 'matrix' && <MatrixScreen />}
        {tab === 'energy' && <EnergyDashboardScreen />}
        {tab === 'recap' && <RecapScreen />}
      </View>
      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <Pressable key={t.key} style={styles.tabButton} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabLabel, tab === t.key && styles.tabLabelActive]}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabLabel: { fontSize: 13, color: '#999' },
  tabLabelActive: { color: '#4CAF50', fontWeight: '700' },
});