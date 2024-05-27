import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // 새로 만든 CSS 파일 불러오기
import './App.css';

import CloudImg from './cloud.png';
import BlackCloudImg from './cloud_black.png';
import PlusImg from './plus.png';
import DeleteImg from './delete.png';
import TitleImg from './Title.png';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
      const updatedTodos = {
        ...todos,
        [dateString]: [...(todos[dateString] || []), { text: newTodo, completed: false }]
      };
      setTodos(updatedTodos);
      setNewTodo("");
    }
  };

  const toggleTodo = (date, index) => {
    const dateString = format(date, 'yyyy-MM-dd', { locale: ko });
    const updatedTodos = {
      ...todos,
      [dateString]: todos[dateString].map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
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

  return (
    <div className="App">
    <img src={TitleImg} className="title-img" />
      <h1 className="app-title">할 일 목록</h1>
      <div className="app-container">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} locale="ko-KR" />
        </div>
        <div className="todo-container">
          <h2 className="todo-title">{format(date, 'PPP', { locale: ko })}의 할 일</h2>
          <div className="todo-input-container">
            <input 
              className="todo-input"
              type="text" 
              value={newTodo} 
              onChange={(e) => setNewTodo(e.target.value)} 
              placeholder="새 할 일을 추가하세요" 
            />
            <button className="add-button" onClick={addTodo}>
              <img src={PlusImg} alt="Add" className="plus-img" />
            </button>
          </div>
          <ul className="todo-list">
            {getCurrentTodos().map((todo, index) => (
              <li key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                <button className="complete-button" onClick={() => toggleTodo(date, index)}>
                  <img 
                    src={todo.completed ? CloudImg : BlackCloudImg} 
                    alt={todo.completed ? "취소" : "완료"} 
                    className="cloud-img"
                  />
                </button>
                <span className="todo-text">{todo.text}</span>
                <button className="delete-button" onClick={() => deleteTodo(date, index)}>
                  <img src={DeleteImg} alt="del" className="delete-img" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
