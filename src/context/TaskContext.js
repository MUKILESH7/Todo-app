import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  };

  const saveTasks = async (newTasks) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => saveTasks([...tasks, task]);
  const toggleTask = (id) =>
    saveTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) => saveTasks(tasks.filter((t) => t.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
