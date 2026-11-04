import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  AREA_LABELS,
  Quadrant,
  QUADRANT_LABELS,
  QUADRANT_ORDER,
  TaskArea,
} from '../types/task';
import { colors, radius } from '../theme';

interface Props {
  onAdd: (title: string, quadrant: Quadrant, area: TaskArea) => void;
}

const AREAS: TaskArea[] = ['work', 'personal'];

export function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [quadrant, setQuadrant] = useState<Quadrant>('important-not-urgent');
  const [area, setArea] = useState<TaskArea>('personal');

  function submit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, quadrant, area);
    setTitle('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa (trabalho ou pessoal)"
        placeholderTextColor={colors.textFaint}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={submit}
        returnKeyType="done"
      />
      <View style={styles.chips}>
        {AREAS.map((a) => (
          <Pressable
            key={a}
            onPress={() => setArea(a)}
            style={[
              styles.chip,
              a === 'work' ? styles.chipWork : styles.chipPersonal,
              area === a && (a === 'work' ? styles.chipWorkActive : styles.chipPersonalActive),
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: a === 'work' ? colors.primary : colors.personal },
                area === a && styles.chipTextActive,
              ]}
            >
              {AREA_LABELS[a]}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.chips}>
        {QUADRANT_ORDER.map((q) => (
          <Pressable
            key={q}
            onPress={() => setQuadrant(q)}
            style={[styles.chip, styles.chipQuadrant, quadrant === q && styles.chipQuadrantActive]}
          >
            <Text style={[styles.chipText, quadrant === q && styles.chipTextActive]}>
              {QUADRANT_LABELS[q].hint}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: colors.text,
    marginBottom: 8,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  chipWork: { backgroundColor: colors.primarySoft },
  chipWorkActive: { backgroundColor: colors.primary },
  chipPersonal: { backgroundColor: colors.personalSoft },
  chipPersonalActive: { backgroundColor: colors.personal },
  chipQuadrant: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipQuadrantActive: { backgroundColor: colors.text, borderColor: colors.text },
  chipText: { fontSize: 12, color: colors.textMuted },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
