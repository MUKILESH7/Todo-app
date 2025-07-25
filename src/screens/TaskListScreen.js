import React, { useContext, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import { useNavigation } from '@react-navigation/native';

export default function TaskListScreen() {
  const { tasks } = useContext(TaskContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet! Add one.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => <TaskCard task={item} />}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.centeredList}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Add Task', { addMode: true })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
  },
  centeredList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
});
