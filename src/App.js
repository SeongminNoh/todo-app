import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';

import CloudImg from './assets/cloud.png';
import BlackCloudImg from './assets/cloud_black.png';
import PlusImg from './assets/plus.png';
import DeleteImg from './assets/delete.png';
import TitleImg from './assets/Title.png';

import styles from './styles';

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [todoTitle, setTodoTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addDefaultTodo = () => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: [...(todos[dateString] || []), { text: "", completed: false, isEditing: true }]
    };
    setTodos(updatedTodos);
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
    if (e.nativeEvent.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleTodoKeyDown = (e, date, index) => {
    if (e.nativeEvent.key === 'Enter') {
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.app}>
        <Image source={TitleImg} style={styles.titleImg} />
        <Text style={styles.appTitle}>할 일 목록</Text>
        <View style={styles.appContainer}>
          <View style={styles.calendarContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text>{format(date, 'PPP', { locale: ko })}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                locale="ko-KR"
              />
            )}
          </View>
          <View style={styles.todoContainer}>
            <Text style={styles.todoTitle}>{format(date, 'PPP', { locale: ko })}의 할 일</Text>
            <View style={styles.todoInputContainer}>
              {isEditingTitle ? (
                <TextInput
                  style={styles.addTodoTitle}
                  value={todoTitle}
                  onChangeText={(text) => setTodoTitle(text)}
                  onSubmitEditing={handleTitleKeyDown}
                />
              ) : (
                <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
                  <Text style={styles.todoTitleText}>{todoTitle}</Text>
                </TouchableOpacity>
              )}
              {!isEditingTitle && (
                <TouchableOpacity style={styles.addButton} onPress={addDefaultTodo}>
                  <Image source={PlusImg} style={styles.plusImg} />
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={getCurrentTodos()}
              renderItem={({ item, index }) => (
                <View key={index} style={[styles.todoItem, item.completed && styles.completed]}>
                  <TouchableOpacity style={styles.completeButton} onPress={() => toggleTodo(date, index)}>
                    <Image 
                      source={item.completed ? CloudImg : BlackCloudImg} 
                      style={styles.cloudImg} 
                    />
                  </TouchableOpacity>
                  {item.isEditing ? (
                    <TextInput
                      style={styles.todoInput}
                      value={item.text}
                      onChangeText={(text) => updateTodoText(date, index, text)}
                      onSubmitEditing={(e) => handleTodoKeyDown(e, date, index)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => {
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
                    }}>
                      <Text style={styles.todoText}>{item.text}</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(date, index)}>
                    <Image source={DeleteImg} style={styles.deleteImg} />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default App;
