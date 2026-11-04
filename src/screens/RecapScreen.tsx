import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { colors, radius } from '../theme';

export function RecapScreen() {
  const { stats } = useTasks();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recap</Text>
      <Text style={styles.subheader}>Sua semana em números.</Text>

      <View style={styles.cardsRow}>
        <StatCard label="Pontos" value={stats.points} />
        <StatCard label="Nível" value={stats.level} />
        <StatCard label="Dias ativos" value={stats.streakDays} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tarefas concluídas esta semana</Text>
        <Text style={styles.bigNumber}>{stats.completedThisWeekCount}</Text>
      </View>

      <View style={styles.futureBox}>
        <Text style={styles.futureTitle}>Em breve: equilíbrio de vida</Text>
        <Text style={styles.futureText}>
          Depois de mais dados de uso, esta área vai mostrar sinais de sobrecarga
          (ex: "trabalho aumentando essa semana") — uma feature premium, disponível
          via assinatura.
        </Text>
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },
  subheader: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  cardsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 26, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 14, color: colors.textMuted, marginBottom: 6 },
  bigNumber: { fontSize: 34, fontWeight: '800', color: colors.text },
  futureBox: {
    backgroundColor: colors.personalSoft,
    borderRadius: radius.md,
    padding: 16,
  },
  futureTitle: { fontSize: 14, fontWeight: '700', color: colors.personal, marginBottom: 4 },
  futureText: { fontSize: 12, color: colors.text, lineHeight: 18 },
});
