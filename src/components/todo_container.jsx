import { useState, useEffect } from "react";
import TodoInput from "./todo_input";
import TodoList from "./todo_list";
//import { getTodos, addTodo, deleteTodo } from "../api/todoApi"; // 나중에 추가

export default function TodoContainer() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // 나중에 백엔드 연결 시 API 호출 부분
    // 임시로 로컬에 기본 데이터 추가
    setTodos([
      { id: 1, title: "데브코스 강의 수강하기", completed: false },
      { id: 2, title: "React 구조 잡기", completed: true },
    ]);
  }, []);

  const handleAdd = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onUpdate={() => {}}/>
    </div>
  );
}
