import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // 새로 만든 CSS 파일 불러오기
import './App.css';

import CloudImg from './asset/cloud.png';
import BlackCloudImg from './asset/cloud_black.png';
import PlusImg from './asset/plus.png';
import DeleteImg from './asset/elete.png';
import TitleImg from './asset/Title.png';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

function App() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [todoTitle, setTodoTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(true);

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
    <div className="App">
      <img src={TitleImg} className="title-img" alt="타이틀 이미지" />
      <h1 className="app-title">할 일 목록</h1>
      <div className="app-container">
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} locale="ko-KR" />
        </div>
        <div className="todo-container">
          <h2 className="todo-title">{format(date, 'PPP', { locale: ko })}의 할 일</h2>
          <div className="todo-input-container">
            {isEditingTitle ? (
              <input
                className="add-todo-title"
                type="text"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)} // 제목 변경 이벤트 핸들러
                onKeyDown={handleTitleKeyDown} // 엔터 키 이벤트 핸들러 추가
              />
            ) : (
              <span className="todo-title-text" onDoubleClick={() => setIsEditingTitle(true)}>
                {todoTitle}
              </span>
            )}
            {!isEditingTitle && (
              <button className="add-button" onClick={addDefaultTodo}>
                <img src={PlusImg} alt="Add" className="plus-img" />
              </button>
            )}
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
                {todo.isEditing ? (
                  <input
                    className="todo-input"
                    type="text"
                    value={todo.text}
                    onChange={(e) => updateTodoText(date, index, e.target.value)}
                    onKeyDown={(e) => handleTodoKeyDown(e, date, index)} // 엔터 키 이벤트 핸들러 추가
                  />
                ) : (
                  <span
                    className="todo-text"
                    onDoubleClick={() => {
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
                  </span>
                )}
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