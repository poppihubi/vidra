import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { Quadrant, QUADRANT_LABELS } from '../types/task';
import { colors, radius } from '../theme';

// Layout clássico da Matriz de Eisenhower, em grade 2x2:
//
//              URGENTE                NÃO URGENTE
// IMPORTANTE   [urgent-important]     [important-not-urgent]
// NÃO IMP.     [urgent-not-important] [neither]
const GRID: Quadrant[][] = [
  ['urgent-important', 'important-not-urgent'],
  ['urgent-not-important', 'neither'],
];

const QUADRANT_COLORS: Record<Quadrant, { bg: string; border: string; accent: string }> = {
  'urgent-important': { bg: colors.accentSoft, border: '#E3B79B', accent: colors.accent },
  'important-not-urgent': { bg: colors.primarySoft, border: '#A9CBBD', accent: colors.primary },
  'urgent-not-important': { bg: colors.personalSoft, border: '#C9BEE0', accent: colors.personal },
  neither: { bg: '#E7EBE6', border: colors.border, accent: colors.textMuted },
};

export function MatrixScreen() {
  const { tasks, toggleTask, removeTask } = useTasks();

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Matriz</Text>
      <Text style={styles.subheader}>O que fazer, planejar, delegar e eliminar.</Text>

      <View style={styles.axisRow}>
        <Text style={styles.axisLabel}>Urgente</Text>
        <Text style={styles.axisLabel}>Não urgente</Text>
      </View>

      <View style={styles.grid}>
        {GRID.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((q) => {
              const items = tasks.filter((t) => t.quadrant === q && !t.completed);
              const c = QUADRANT_COLORS[q];
              return (
                <View
                  key={q}
                  style={[styles.quadrant, { backgroundColor: c.bg, borderColor: c.border }]}
                >
                  <Text style={[styles.quadrantHint, { color: c.accent }]}>
                    {QUADRANT_LABELS[q].hint}
                  </Text>
                  <Text style={styles.quadrantTitle}>{QUADRANT_LABELS[q].title}</Text>
                  <ScrollView style={styles.quadrantList} showsVerticalScrollIndicator={false}>
                    {items.length === 0 ? (
                      <Text style={styles.empty}>Vazio</Text>
                    ) : (
                      items.map((t) => (
                        <Pressable
                          key={t.id}
                          style={styles.taskRow}
                          onPress={() => toggleTask(t.id)}
                          onLongPress={() => removeTask(t.id)}
                        >
                          <View style={[styles.checkbox, { borderColor: c.accent }]} />
                          <Text style={styles.taskText} numberOfLines={2}>
                            {t.title}
                          </Text>
                        </Pressable>
                      ))
                    )}
                  </ScrollView>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <Text style={styles.tip}>Toque para concluir · toque e segure para remover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },
  subheader: { fontSize: 13, color: colors.textMuted, marginBottom: 12 },
  axisRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  axisLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  grid: { flex: 1 },
  row: { flex: 1, flexDirection: 'row', gap: 8, marginBottom: 8 },
  quadrant: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1.5,
    padding: 10,
  },
  quadrantHint: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  quadrantTitle: { fontSize: 11, color: colors.textMuted, marginBottom: 6 },
  quadrantList: { flex: 1 },
  empty: { fontSize: 11, color: colors.textFaint, fontStyle: 'italic' },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    marginRight: 6,
  },
  taskText: { flex: 1, fontSize: 12, color: colors.text },
  tip: { textAlign: 'center', fontSize: 11, color: colors.textFaint, marginTop: 4 },
});
