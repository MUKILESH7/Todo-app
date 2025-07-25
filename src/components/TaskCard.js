import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Checkbox, IconButton, Text } from 'react-native-paper';
import { TaskContext } from '../context/TaskContext';

// Helper to format date
function formatDate(dateStr) {
  if (!dateStr) return 'No date';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useContext(TaskContext);

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={<Text style={styles.title}>{task.title}</Text>}
        // Removed subtitle (due date)
        left={() => (
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={() => toggleTask(task.id)}
          />
        )}
        right={() => (
          <IconButton icon="delete" onPress={() => deleteTask(task.id)} />
        )}
        style={styles.cardTitle}
      />
      {task.description ? (
        <Card.Content>
          <Text style={styles.description}>{task.description}</Text>
        </Card.Content>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
  },
  cardTitle: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 18,
    color: '#444',
    marginTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    margin: 0,
    marginRight: -8,
  },
});