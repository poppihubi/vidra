import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';

export type MoreView = 'matrix' | 'energy' | 'recap';

const ITEMS: { key: MoreView; title: string; description: string }[] = [
  { key: 'matrix', title: 'Matriz', description: 'Eisenhower: o que fazer, planejar, delegar e eliminar.' },
  { key: 'energy', title: 'Energia', description: 'Onde vai o seu combustível hoje.' },
  { key: 'recap', title: 'Recap', description: 'Pontos, nível e sequência da semana.' },
];

interface Props {
  onOpen: (view: MoreView) => void;
}

export function MoreScreen({ onOpen }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Mais</Text>
      <Text style={styles.subheader}>Outras formas de olhar pra sua vida.</Text>
      {ITEMS.map((item) => (
        <Pressable key={item.key} style={styles.card} onPress={() => onOpen(item.key)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: colors.text },
  subheader: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardDescription: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
  chevron: { fontSize: 24, color: colors.textFaint, marginLeft: 8 },
});
