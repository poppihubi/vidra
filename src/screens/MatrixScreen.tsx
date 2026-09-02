import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { Quadrant, QUADRANT_LABELS } from '../types/task';

// Layout clássico da Matriz de Eisenhower, em grade 2x2:
//
//              URGENTE                NÃO URGENTE
// IMPORTANTE   [urgent-important]     [important-not-urgent]
// NÃO IMP.     [urgent-not-important] [neither]
const GRID: Quadrant[][] = [
  ['urgent-important', 'important-not-urgent'],
  ['urgent-not-important', 'neither'],
];

const QUADRANT_COLORS: Record<Quadrant, { bg: string; border: string }> = {
  'urgent-important': { bg: '#fdeaea', border: '#e05c5c' },
  'important-not-urgent': { bg: '#e8f0fe', border: '#4c7ef0' },
  'urgent-not-important': { bg: '#fff6e0', border: '#e0ab3c' },
  neither: { bg: '#eeeeee', border: '#999999' },
};

export function MatrixScreen() {
  const { tasks, toggleTask, removeTask } = useTasks();

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Matriz de Eisenhower</Text>

      <View style={styles.axisRow}>
        <View style={styles.axisSpacer} />
        <Text style={styles.axisLabel}>Urgente</Text>
        <Text style={styles.axisLabel}>Não urgente</Text>
      </View>

      <View style={styles.grid}>
        {GRID.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((q) => {
              const items = tasks.filter((t) => t.quadrant === q && !t.completed);
              const colors = QUADRANT_COLORS[q];
              return (
                <View
                  key={q}
                  style={[
                    styles.quadrant,
                    { backgroundColor: colors.bg, borderColor: colors.border },
                  ]}
                >
                  <Text style={styles.quadrantHint}>{QUADRANT_LABELS[q].hint}</Text>
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
                          <View style={styles.checkbox} />
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
  screen: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#222' },
  axisRow: { flexDirection: 'row', marginBottom: 4 },
  axisSpacer: { width: 28 },
  axisLabel: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '600', color: '#666' },
  grid: { flex: 1 },
  row: { flex: 1, flexDirection: 'row', gap: 8, marginBottom: 8 },
  quadrant: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 10,
  },
  quadrantHint: { fontSize: 11, fontWeight: '800', color: '#333', textTransform: 'uppercase' },
  quadrantTitle: { fontSize: 11, color: '#555', marginBottom: 6 },
  quadrantList: { flex: 1 },
  empty: { fontSize: 11, color: '#999', fontStyle: 'italic' },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#666',
    marginRight: 6,
  },
  taskText: { flex: 1, fontSize: 12, color: '#222' },
  tip: { textAlign: 'center', fontSize: 11, color: '#999', marginTop: 4 },
});