import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TodayScreen } from '../screens/TodayScreen';
import { TaskListScreen } from '../screens/TaskListScreen';
import { WeekScreen } from '../screens/WeekScreen';
import { FocusScreen } from '../screens/FocusScreen';
import { MoreScreen, MoreView } from '../screens/MoreScreen';
import { MatrixScreen } from '../screens/MatrixScreen';
import { RecapScreen } from '../screens/RecapScreen';
import { EnergyDashboardScreen } from '../screens/EnergyDashboardScreen';
import { colors } from '../theme';

type Tab = 'today' | 'tasks' | 'week' | 'focus' | 'more';

const TABS: { key: Tab; label: string }[] = [
  { key: 'today', label: 'Hoje' },
  { key: 'tasks', label: 'Tarefas' },
  { key: 'week', label: 'Semana' },
  { key: 'focus', label: 'Foco' },
  { key: 'more', label: 'Mais' },
];

const MORE_TITLES: Record<MoreView, string> = {
  matrix: 'Matriz',
  energy: 'Energia',
  recap: 'Recap',
};

// MVP usa um seletor de abas simples em vez de @react-navigation, pra manter
// o scaffold inicial leve. Trocar por react-navigation/bottom-tabs é
// direto quando o app crescer (rotas nomeadas, deep links, etc.).
export function RootTabs() {
  const [tab, setTab] = useState<Tab>('today');
  const [moreView, setMoreView] = useState<MoreView | null>(null);

  function selectTab(next: Tab) {
    setTab(next);
    if (next === 'more') setMoreView(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tab === 'today' && <TodayScreen onAddPress={() => setTab('tasks')} />}
        {tab === 'tasks' && <TaskListScreen />}
        {tab === 'week' && <WeekScreen />}

        {/* O Foco fica sempre montado pra o timer não zerar ao trocar de aba. */}
        <View style={tab === 'focus' ? styles.fill : styles.hidden}>
          <FocusScreen />
        </View>

        {tab === 'more' && moreView === null && <MoreScreen onOpen={setMoreView} />}
        {tab === 'more' && moreView !== null && (
          <View style={styles.fill}>
            <Pressable style={styles.back} onPress={() => setMoreView(null)}>
              <Text style={styles.backText}>‹ Mais · {MORE_TITLES[moreView]}</Text>
            </Pressable>
            {moreView === 'matrix' && <MatrixScreen />}
            {moreView === 'energy' && <EnergyDashboardScreen />}
            {moreView === 'recap' && <RecapScreen />}
          </View>
        )}
      </View>
      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable key={t.key} style={styles.tabButton} onPress={() => selectTab(t.key)}>
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
  fill: { flex: 1 },
  hidden: { display: 'none' },
  back: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 2, backgroundColor: colors.bg },
  backText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
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
