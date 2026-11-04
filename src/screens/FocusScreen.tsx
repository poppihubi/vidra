import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { QUADRANT_ORDER } from '../types/task';
import { colors, radius } from '../theme';

const FOCUS_SECONDS = 25 * 60;
const RING_SIZE = 230;
const DOTS = 60;
const DOT_SIZE = 7;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function FocusScreen() {
  const { tasks } = useTasks();
  const pending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => QUADRANT_ORDER.indexOf(a.quadrant) - QUADRANT_ORDER.indexOf(b.quadrant));

  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(FOCUS_SECONDS);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running && remaining === 0) setRunning(false);
  }, [running, remaining]);

  const finished = remaining === 0;
  const started = remaining < FOCUS_SECONDS;
  const current = pending.length > 0 ? pending[index % pending.length] : undefined;

  const elapsedDots = Math.floor(((FOCUS_SECONDS - remaining) / FOCUS_SECONDS) * DOTS);
  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  const status = running
    ? 'Em foco'
    : finished
      ? 'Sessão concluída'
      : started
        ? 'Pausado'
        : 'Pronto pra começar';

  function end() {
    setRunning(false);
    setRemaining(FOCUS_SECONDS);
  }

  function mainAction() {
    if (finished) {
      setRemaining(FOCUS_SECONDS);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  }

  const mainLabel = running ? 'Pausar' : finished ? 'Reiniciar' : started ? 'Retomar' : 'Iniciar';

  const center = RING_SIZE / 2;
  const radiusPx = center - DOT_SIZE;

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Foco</Text>

      <Pressable style={styles.taskBox} onPress={() => setIndex((i) => i + 1)}>
        <Text style={styles.taskLabel}>{status}</Text>
        <Text style={styles.taskTitle} numberOfLines={2}>
          {current ? current.title : 'Adicione uma tarefa pra focar'}
        </Text>
        {pending.length > 1 && <Text style={styles.taskSwap}>Toque pra trocar de tarefa</Text>}
      </Pressable>

      <View style={styles.ringWrap}>
        <View style={{ width: RING_SIZE, height: RING_SIZE }}>
          {Array.from({ length: DOTS }, (_, i) => {
            const angle = (i / DOTS) * Math.PI * 2;
            const x = center + radiusPx * Math.sin(angle) - DOT_SIZE / 2;
            const y = center - radiusPx * Math.cos(angle) - DOT_SIZE / 2;
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: DOT_SIZE / 2,
                  backgroundColor: i < elapsedDots ? colors.primary : colors.border,
                }}
              />
            );
          })}
          <View style={styles.ringCenter}>
            <Text style={styles.time}>
              {pad(mm)}:{pad(ss)}
            </Text>
            <Text style={styles.timeSub}>de 25 min</Text>
          </View>
        </View>
      </View>

      <Text style={styles.hint}>Uma coisa de cada vez.</Text>

      <View style={styles.buttons}>
        <Pressable style={[styles.button, styles.buttonSoft]} onPress={end}>
          <Text style={styles.buttonSoftText}>Encerrar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonMain]} onPress={mainAction}>
          <Text style={styles.buttonMainText}>{mainLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 14 },
  taskBox: { alignItems: 'center', marginBottom: 18 },
  taskLabel: { fontSize: 12, color: colors.textMuted },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
    textAlign: 'center',
    marginTop: 4,
  },
  taskSwap: { fontSize: 11, color: colors.textFaint, marginTop: 4 },
  ringWrap: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  ringCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: { fontSize: 46, fontWeight: '300', color: colors.text },
  timeSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  hint: { textAlign: 'center', fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  buttons: { flexDirection: 'row', gap: 12 },
  button: { flex: 1, borderRadius: radius.pill, paddingVertical: 14, alignItems: 'center' },
  buttonSoft: { backgroundColor: colors.primarySoft },
  buttonSoftText: { color: colors.primary, fontWeight: '700' },
  buttonMain: { backgroundColor: colors.accent },
  buttonMainText: { color: '#fff', fontWeight: '700' },
});
