import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import CloudImg from './assets/cloud.png';
import BlackCloudImg from './assets/cloud_black.png';
import PlusImg from './assets/plus.png';
import DeleteImg from './assets/delete.png';
import TitleImg from './assets/Title.png';

import styles from './styles'; // 스타일 파일 import

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [todoTitle, setTodoTitle] = useState({});
  const [isEditingTitle, setIsEditingTitle] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addDefaultTodo = () => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: [...(todos[dateString] || []), { text: "", completed: false, isEditing: true }]
    };
    setTodos(updatedTodos);

    if (!todoTitle[dateString]) {
      setTodoTitle({ ...todoTitle, [dateString]: "" });
    }
  };

  const updateTodoText = (date, index, text) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].map((todo, i) => {
        if (i === index) {
          return { ...todo, text };
        }
        return todo;
      })
    };
    setTodos(updatedTodos);
  };

  const toggleTodo = (date, index) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed, isEditing: false };
        }
        return todo;
      })
    };
    setTodos(updatedTodos);
  };

  const deleteTodo = (date, index) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].filter((_, i) => i !== index)
    };
    setTodos(updatedTodos);
  };

  const getCurrentTodos = () => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    return todos[dateString] || [];
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleTodoKeyDown = (e, date, index) => {
    if (e.key === 'Enter') {
      const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
      const updatedTodos = {
        ...todos,
        [dateString]: todos[dateString].map((todo, i) => {
          if (i === index) {
            return { ...todo, isEditing: false };
          }
          return todo;
        })
      };
      setTodos(updatedTodos);
    }
  };

  return (
    <View style={styles.app}>
      <Image source={TitleImg} style={styles.titleImg} />
      <Text style={styles.appTitle}>할 일 목록</Text>
      <View style={styles.appContainer}>
        <View style={styles.calendarContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{format(date, 'PPP', { locale: ko })}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </View>
        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>{format(date, 'PPP', { locale: ko })}의 할 일</Text>
          <View style={styles.todoInputContainer}>
            {isEditingTitle ? (
              <TextInput
                style={styles.addTodoTitle}
                value={todoTitle[format(date, 'yyyy-MM-dd', { locale: ko })] || ""}
                onChangeText={(text) => setTodoTitle({ ...todoTitle, [format(date, 'yyyy-MM-dd', { locale: ko })]: text })}
                onSubmitEditing={handleTitleKeyDown}
              />
            ) : (
              <Text style={styles.todoTitleText} onPress={() => setIsEditingTitle(true)}>
                {todoTitle[format(date, 'yyyy-MM-dd', { locale: ko })] || ""}
              </Text>
            )}
            {!isEditingTitle && (
              <TouchableOpacity style={styles.addButton} onPress={addDefaultTodo}>
                <Image source={PlusImg} style={styles.plusImg} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView style={styles.todoList}>
            {getCurrentTodos().map((todo, index) => (
              <View key={index} style={[styles.todoItem, todo.completed && styles.completed]}>
                <TouchableOpacity style={styles.completeButton} onPress={() => toggleTodo(date, index)}>
                  <Image 
                    source={todo.completed ? CloudImg : BlackCloudImg} 
                    style={styles.cloudImg} 
                  />
                </TouchableOpacity>
                {todo.isEditing ? (
                  <TextInput
                    style={styles.todoInput}
                    value={todo.text}
                    onChangeText={(text) => updateTodoText(date, index, text)}
                    onSubmitEditing={(e) => handleTodoKeyDown(e, date, index)}
                  />
                ) : (
                  <Text
                    style={styles.todoText}
                    onPress={() => {
                      const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
                      const updatedTodos = {
                        ...todos,
                        [dateString]: todos[dateString].map((todo, i) => {
                          if (i === index) {
                            return { ...todo, isEditing: true };
                          }
                          return todo;
                        })
                      };
                      setTodos(updatedTodos);
                    }}
                  >
                    {todo.text}
                  </Text>
                )}
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(date, index)}>
                  <Image source={DeleteImg} style={styles.deleteImg} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default App;
