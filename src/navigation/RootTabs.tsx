import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TaskListScreen } from '../screens/TaskListScreen';
import { MatrixScreen } from '../screens/MatrixScreen';
import { RecapScreen } from '../screens/RecapScreen';
import { EnergyDashboardScreen } from '../screens/EnergyDashboardScreen';
import { colors } from '../theme';

type Tab = 'tasks' | 'matrix' | 'energy' | 'recap';

const TABS: { key: Tab; label: string }[] = [
  { key: 'tasks', label: 'Tarefas' },
  { key: 'matrix', label: 'Matriz' },
  { key: 'energy', label: 'Energia' },
  { key: 'recap', label: 'Recap' },
];

// MVP usa um seletor de abas simples em vez de @react-navigation, pra manter
// o scaffold inicial leve. Trocar por react-navigation/bottom-tabs é
// direto quando o app crescer (rotas nomeadas, deep links, etc.).
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
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable key={t.key} style={styles.tabButton} onPress={() => setTab(t.key)}>
              <View style={[styles.tabIndicator, active && styles.tabIndicatorActive]} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabButton: { flex: 1, paddingTop: 8, paddingBottom: 12, alignItems: 'center' },
  tabIndicator: {
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  tabIndicatorActive: { backgroundColor: colors.primary },
  tabLabel: { fontSize: 12, color: colors.textFaint },
  tabLabelActive: { color: colors.primary, fontWeight: '700' },
});
