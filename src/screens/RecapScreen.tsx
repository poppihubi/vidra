import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';

export function RecapScreen() {
  const { stats } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seu recap da semana</Text>

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
        <Text style={styles.futureTitle}>Em breve: insights de equilíbrio de vida</Text>
        <Text style={styles.futureText}>
          Depois de mais dados de uso, esta área vai mostrar sinais de sobrecarga
          (ex: "trabalho aumentando essa semana") — uma feature premium, disponível
          via assinatura.
        </Text>
      </View>
    </View>
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
  container: { flex: 1, padding: 16, backgroundColor: '#f4f4f4' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#222' },
  cardsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 24, fontWeight: '800', color: '#4CAF50' },
  statLabel: { fontSize: 12, color: '#777', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 14, color: '#555', marginBottom: 6 },
  bigNumber: { fontSize: 32, fontWeight: '800', color: '#222' },
  futureBox: {
    backgroundColor: '#eef6ee',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cde5cd',
  },
  futureTitle: { fontSize: 14, fontWeight: '700', color: '#2e6b2e', marginBottom: 4 },
  futureText: { fontSize: 12, color: '#3f6b3f', lineHeight: 18 },
});
