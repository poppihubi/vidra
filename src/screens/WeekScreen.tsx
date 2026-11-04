import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { AREA_LABELS, areaOf } from '../types/task';
import { addDays, formatTime, isSameDay, MONTHS, startOfDay, startOfWeek, WEEKDAYS_FULL } from '../utils/dates';
import { colors, radius } from '../theme';

const DAY_LETTERS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export function WeekScreen() {
  const { tasks } = useTasks();
  const today = new Date();
  const monday = startOfWeek(today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  const [selected, setSelected] = useState<Date>(startOfDay(today));

  const completed = tasks.filter((t) => t.completed && t.completedAt);
  const endOfWeek = addDays(monday, 7);
  const inWeek = completed.filter((t) => {
    const d = new Date(t.completedAt as string);
    return d >= monday && d < endOfWeek;
  });
  const workCount = inWeek.filter((t) => areaOf(t) === 'work').length;
  const personalCount = inWeek.length - workCount;

  const dayTasks = completed
    .filter((t) => isSameDay(new Date(t.completedAt as string), selected))
    .sort((a, b) => (a.completedAt as string).localeCompare(b.completedAt as string));

  const first = days[0];
  const last = days[6];
  const rangeLabel =
    first.getMonth() === last.getMonth()
      ? `${first.getDate()} a ${last.getDate()} de ${MONTHS[last.getMonth()]}`
      : `${first.getDate()} de ${MONTHS[first.getMonth()].slice(0, 3)} a ${last.getDate()} de ${MONTHS[last.getMonth()].slice(0, 3)}`;

  const selectedLabel = isSameDay(selected, today)
    ? 'Hoje'
    : `${WEEKDAYS_FULL[selected.getDay()]}, ${selected.getDate()}`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.range}>{rangeLabel}</Text>
      <Text style={styles.header}>Sua semana</Text>

      <View style={styles.daysRow}>
        {days.map((d, i) => {
          const isSelected = isSameDay(d, selected);
          const hasActivity = completed.some((t) =>
            isSameDay(new Date(t.completedAt as string), d),
          );
          return (
            <Pressable key={i} style={styles.dayCol} onPress={() => setSelected(d)}>
              <Text style={styles.dayLetter}>{DAY_LETTERS[i]}</Text>
              <View style={[styles.dayCircle, isSelected && styles.dayCircleActive]}>
                <Text style={[styles.dayNumber, isSelected && styles.dayNumberActive]}>
                  {d.getDate()}
                </Text>
              </View>
              <View style={[styles.dot, hasActivity && styles.dotActive]} />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.balance}>
        <Text style={styles.balanceTitle}>Equilíbrio da semana</Text>
        <View style={styles.bar}>
          {inWeek.length === 0 ? (
            <View style={[styles.barPart, { flex: 1, backgroundColor: colors.border }]} />
          ) : (
            <>
              {workCount > 0 && (
                <View style={[styles.barPart, { flex: workCount, backgroundColor: colors.primary }]} />
              )}
              {personalCount > 0 && (
                <View
                  style={[styles.barPart, { flex: personalCount, backgroundColor: colors.personal }]}
                />
              )}
            </>
          )}
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>
              {AREA_LABELS.work} · {workCount}
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.personal }]} />
            <Text style={styles.legendText}>
              {AREA_LABELS.personal} · {personalCount}
            </Text>
          </View>
        </View>
        <Text style={styles.balanceHint}>
          {inWeek.length === 0
            ? 'Conclua tarefas pra ver como sua semana se divide.'
            : 'Tarefas concluídas nesta semana.'}
        </Text>
      </View>

      <Text style={styles.dayTitle}>{selectedLabel}</Text>
      {dayTasks.length === 0 ? (
        <Text style={styles.empty}>Nada concluído neste dia.</Text>
      ) : (
        dayTasks.map((t) => {
          const area = areaOf(t);
          const isWork = area === 'work';
          return (
            <View
              key={t.id}
              style={[
                styles.dayTask,
                { backgroundColor: isWork ? colors.primarySoft : colors.personalSoft },
              ]}
            >
              <Text style={styles.dayTaskTime}>{formatTime(new Date(t.completedAt as string))}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.dayTaskTitle}>{t.title}</Text>
                <Text
                  style={[styles.dayTaskArea, { color: isWork ? colors.primary : colors.personal }]}
                >
                  {AREA_LABELS[area]}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
  range: { fontSize: 13, color: colors.textMuted },
  header: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 14 },

  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  dayCol: { alignItems: 'center', flex: 1 },
  dayLetter: { fontSize: 11, color: colors.textFaint, marginBottom: 6 },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: { backgroundColor: colors.primary },
  dayNumber: { fontSize: 14, color: colors.text, fontWeight: '600' },
  dayNumberActive: { color: '#fff' },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 4, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: colors.accent },

  balance: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 20,
  },
  balanceTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 10 },
  bar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', gap: 3 },
  barPart: { height: 8 },
  legend: { flexDirection: 'row', gap: 16, marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: colors.textMuted },
  balanceHint: { fontSize: 12, color: colors.textFaint, marginTop: 10 },

  dayTitle: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginBottom: 8 },
  empty: { color: colors.textFaint, fontSize: 13 },
  dayTask: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 8,
  },
  dayTaskTime: { width: 46, fontSize: 12, color: colors.textMuted },
  dayTaskTitle: { fontSize: 14, color: colors.text, fontWeight: '600' },
  dayTaskArea: { fontSize: 11, marginTop: 2 },
});
