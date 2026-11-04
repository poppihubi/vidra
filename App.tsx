import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TasksProvider } from './src/hooks/useTasks';
import { RootTabs } from './src/navigation/RootTabs';
import { colors } from './src/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <RootTabs />
          <StatusBar style="dark" />
        </SafeAreaView>
      </TasksProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
