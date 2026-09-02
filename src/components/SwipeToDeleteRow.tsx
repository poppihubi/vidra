import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  onDelete: () => void;
}

const SWIPE_THRESHOLD = 90;

// Deslizar pra esquerda remove o item. Usa só Animated + PanResponder (já
// vêm no react-native core), sem precisar instalar react-native-gesture-handler.
export function SwipeToDeleteRow({ children, onDelete }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -SWIPE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: -400,
            duration: 180,
            useNativeDriver: true,
          }).start(() => onDelete());
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 6,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.wrapper}>
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>🗑 remover</Text>
      </View>
      <Animated.View
        style={[styles.row, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', marginBottom: 6, borderRadius: 8, overflow: 'hidden' },
  deleteBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#c0392b',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 14,
  },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 11 },
  row: { backgroundColor: 'rgba(255,255,255,0.6)', paddingVertical: 4, paddingHorizontal: 2 },
});