import React, { useState, useContext } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, Button, Switch, Text, Card, Chip } from "react-native-paper";
import { TaskContext } from "../context/TaskContext";
import DateTimePicker from "@react-native-community/datetimepicker"; // <-- Add this import

// Helper to format date
function formatDate(dateStr) {
  if (!dateStr) return "No date";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function ProfileScreen({ route, navigation }) {
  const { addTask, updateTask } = useContext(TaskContext);
  const editTask = route.params?.editTask;

  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [dueDate, setDueDate] = useState(
    editTask?.dueDate || new Date().toISOString().split("T")[0]
  );
  const [completed, setCompleted] = useState(editTask?.completed || false);

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // On Android, close after pick; on iOS, keep open
    if (selectedDate) {
      setDueDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    if (editTask) {
      updateTask({ ...editTask, title, description, dueDate, completed });
    } else {
      addTask({
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        completed,
      });
    }

    setTitle("");
    setDescription("");
    setCompleted(false);
    setDueDate(new Date().toISOString().split("T")[0]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.heading}>
            {editTask ? "Edit Task" : "Add New Task"}
          </Text>

          <TextInput
            mode="outlined"
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />

          <TextInput
            mode="outlined"
            label="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
            style={styles.input}
          />

          {/* Beautiful Date UI */}
          <View style={styles.dateChipContainer}>
            <Chip
              icon="calendar"
              style={styles.dateChip}
              textStyle={styles.dateChipText}
              onPress={() => setShowDatePicker(true)}
            >
              {formatDate(dueDate)}
            </Chip>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate ? new Date(dueDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.switchContainer}>
            <Text style={{ marginRight: 8 }}>Completed:</Text>
            <Switch value={completed} onValueChange={setCompleted} />
          </View>

          <Button mode="contained" onPress={handleSave} style={styles.btn}>
            {editTask ? "Update Task" : "Save Task"}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    elevation: 5,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
  },
  dateChipContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  dateChip: {
    backgroundColor: "#e3e6fc",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dateChipText: {
    fontSize: 16,
    color: "#3a3a7c",
    fontWeight: "bold",
  },
});
