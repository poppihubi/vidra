import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { AREA_LABELS, areaOf, QUADRANT_ORDER, Task, TaskArea } from '../types/task';
import { greeting, isSameDay, MONTHS, WEEKDAYS_FULL } from '../utils/dates';
import { colors, radius } from '../theme';

interface Props {
  onAddPress: () => void;
}

const AREAS: TaskArea[] = ['work', 'personal'];

export function TodayScreen({ onAddPress }: Props) {
  const { tasks, toggleTask } = useTasks();
  const now = new Date();

  const pending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => QUADRANT_ORDER.indexOf(a.quadrant) - QUADRANT_ORDER.indexOf(b.quadrant));
  const doneToday = tasks.filter(
    (t) => t.completed && t.completedAt && isSameDay(new Date(t.completedAt), now),
  );

  const dateLabel = `${WEEKDAYS_FULL[now.getDay()]}, ${now.getDate()} de ${MONTHS[now.getMonth()]}`;
  const count = pending.length;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.date}>{dateLabel}</Text>
        <Text style={styles.greeting}>{greeting(now)}</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>
            {count === 0
              ? 'Tudo em dia'
              : count === 1
                ? '1 tarefa esperando'
                : `${count} tarefas esperando`}
          </Text>
          <Text style={styles.summaryText}>
            {count === 0
              ? 'Nada pendente agora. Aproveite o espaço.'
              : 'Sem pressa — vamos ver quais ainda fazem sentido hoje.'}
          </Text>
        </View>

        {AREAS.map((area) => {
          const list: Task[] = [
            ...pending.filter((t) => areaOf(t) === area),
            ...doneToday.filter((t) => areaOf(t) === area),
          ];
          if (list.length === 0) return null;
          return (
            <View key={area} style={styles.section}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: area === 'work' ? colors.primary : colors.personal },
                ]}
              >
                {AREA_LABELS[area]}
              </Text>
              {list.map((t) => (
                <Pressable key={t.id} style={styles.row} onPress={() => toggleTask(t.id)}>
                  <View style={[styles.checkbox, t.completed && styles.checkboxDone]}>
                    {t.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.rowText, t.completed && styles.rowTextDone]}>{t.title}</Text>
                </Pressable>
              ))}
            </View>
          );
        })}

        {tasks.length === 0 && (
          <Text style={styles.empty}>
            Nada por aqui ainda. Toque no + pra adicionar sua primeira tarefa.
          </Text>
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={onAddPress}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 96 },
  date: { fontSize: 13, color: colors.textMuted },
  greeting: { fontSize: 30, fontWeight: '700', color: colors.text, marginBottom: 16 },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  summaryText: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9 },
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
  rowText: { flex: 1, fontSize: 15, color: colors.text },
  rowTextDone: { textDecorationLine: 'line-through', color: colors.textFaint },
  empty: { textAlign: 'center', color: colors.textFaint, marginTop: 24 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabText: { color: '#fff', fontSize: 30, lineHeight: 34, fontWeight: '400' },
});
