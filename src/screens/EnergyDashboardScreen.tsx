import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SwipeToDeleteRow } from '../components/SwipeToDeleteRow';
import { useTasks } from '../hooks/useTasks';
import { ENERGY_ZONE_LABELS } from '../types/task';
import { colors, radius } from '../theme';

export function EnergyDashboardScreen() {
  const { tasks, toggleTask, removeTask } = useTasks();

  const power = tasks.filter((t) => t.quadrant === 'important-not-urgent' && !t.completed);
  const focus = tasks.filter((t) => t.quadrant === 'urgent-important' && !t.completed);
  const distraction = tasks.filter((t) => t.quadrant === 'urgent-not-important' && !t.completed);
  const trash = tasks.filter((t) => t.quadrant === 'neither' && !t.completed);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Painel de Energia</Text>
      <Text style={styles.subheader}>Onde vai o seu combustível hoje</Text>

      {/* Zona de Poder — o maior destaque da tela */}
      <View style={styles.powerZone}>
        <Text style={styles.powerEmoji}>{ENERGY_ZONE_LABELS['important-not-urgent'].emoji}</Text>
        <Text style={styles.powerTitle}>{ENERGY_ZONE_LABELS['important-not-urgent'].title}</Text>
        <Text style={styles.powerDescription}>
          {ENERGY_ZONE_LABELS['important-not-urgent'].description}
        </Text>
        {power.length === 0 ? (
          <Text style={styles.powerEmpty}>
            Nada aqui ainda — adicione o que constrói seu futuro.
          </Text>
        ) : (
          power.map((t) => (
            <Pressable key={t.id} style={styles.powerTask} onPress={() => toggleTask(t.id)}>
              <Text style={styles.powerTaskText}>✨ {t.title}</Text>
            </Pressable>
          ))
        )}
      </View>

      {/* Modo Foco — limpo e direto */}
      <View style={styles.focusZone}>
        <Text style={styles.focusTitle}>
          {ENERGY_ZONE_LABELS['urgent-important'].emoji}{' '}
          {ENERGY_ZONE_LABELS['urgent-important'].title}
        </Text>
        <Text style={styles.focusDescription}>
          {ENERGY_ZONE_LABELS['urgent-important'].description}
        </Text>
        {focus.length === 0 ? (
          <Text style={styles.zoneEmpty}>Nenhum incêndio agora.</Text>
        ) : (
          focus.map((t) => (
            <Pressable key={t.id} style={styles.focusTask} onPress={() => toggleTask(t.id)}>
              <Text style={styles.focusTaskText}>{t.title}</Text>
            </Pressable>
          ))
        )}
      </View>

      {/* Distração + Lixeira — segundo plano, menores */}
      <View style={styles.smallRow}>
        <View style={styles.distractionZone}>
          <Text style={styles.smallTitle}>
            {ENERGY_ZONE_LABELS['urgent-not-important'].emoji}{' '}
            {ENERGY_ZONE_LABELS['urgent-not-important'].title}
          </Text>
          {distraction.length === 0 ? (
            <Text style={styles.smallEmpty}>—</Text>
          ) : (
            distraction.map((t) => (
              <Pressable key={t.id} onPress={() => toggleTask(t.id)}>
                <Text style={styles.smallTaskText} numberOfLines={1}>
                  {t.title}
                </Text>
              </Pressable>
            ))
          )}
        </View>

        <View style={styles.trashZone}>
          <Text style={styles.smallTitle}>
            {ENERGY_ZONE_LABELS.neither.emoji} {ENERGY_ZONE_LABELS.neither.title}
          </Text>
          {trash.length === 0 ? (
            <Text style={styles.smallEmpty}>—</Text>
          ) : (
            trash.map((t) => (
              <SwipeToDeleteRow key={t.id} onDelete={() => removeTask(t.id)}>
                <Text style={styles.smallTaskText} numberOfLines={1}>
                  {t.title}
                </Text>
              </SwipeToDeleteRow>
            ))
          )}
        </View>
      </View>

      <Text style={styles.tip}>
        Toque numa tarefa pra concluir · deslize a lixeira pra esquerda pra remover
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },
  subheader: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },

  powerZone: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 14,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  powerEmoji: { fontSize: 26, marginBottom: 2 },
  powerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  powerDescription: { fontSize: 12, color: '#CFE6DC', marginBottom: 10 },
  powerEmpty: { fontSize: 12, color: '#CFE6DC', fontStyle: 'italic' },
  powerTask: {
    backgroundColor: '#ffffff',
    borderRadius: radius.sm + 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  powerTaskText: { fontSize: 14, fontWeight: '600', color: colors.primaryDark },

  focusZone: {
    backgroundColor: colors.surface,
    borderRadius: radius.md + 2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  focusTitle: { fontSize: 15, fontWeight: '700', color: colors.accent },
  focusDescription: { fontSize: 11, color: colors.textMuted, marginBottom: 8 },
  zoneEmpty: { fontSize: 12, color: colors.textFaint, fontStyle: 'italic' },
  focusTask: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  focusTaskText: { fontSize: 13, color: colors.text },

  smallRow: { flexDirection: 'row', gap: 10 },
  distractionZone: {
    flex: 1,
    backgroundColor: colors.personalSoft,
    borderRadius: radius.md,
    padding: 10,
    opacity: 0.9,
  },
  trashZone: {
    flex: 1,
    backgroundColor: '#E7EBE6',
    borderRadius: radius.md,
    padding: 10,
    opacity: 0.9,
  },
  smallTitle: { fontSize: 11, fontWeight: '700', color: colors.textMuted, marginBottom: 6 },
  smallEmpty: { fontSize: 11, color: colors.textFaint },
  smallTaskText: { fontSize: 11, color: colors.text, paddingVertical: 3 },

  tip: { textAlign: 'center', fontSize: 11, color: colors.textFaint, marginTop: 14 },
});
