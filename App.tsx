import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TasksProvider } from './src/hooks/useTasks';
import { RootTabs } from './src/navigation/RootTabs';

export default function App() {
  return (
    <TasksProvider>
      <SafeAreaView style={styles.container}>
        <RootTabs />
        <StatusBar style="auto" />
      </SafeAreaView>
    </TasksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
