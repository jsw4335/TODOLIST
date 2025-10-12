import { useState, useEffect } from "react";
import TodoInput from "./todo_input";
import TodoList from "./todo_list";
import ConfirmModal from "./confirm_modal";
import "../styles/common.css";
//import { getTodos, addTodo, deleteTodo } from "../api/todoApi"; // 나중에 추가

export default function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false); //모달 표시상태
    const [targetId, setTargetId] = useState(null); //삭제 대상 id 저장
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
    //삭제 클릭 시: 모달만 띄우고 대상 id 저장
    const askDelete = (id) => {
        setTargetId(id);
        setShowModal(true);
    };

    //모달 확인: 실제 삭제
    const confirmDelete = () => {
        setTodos(todos.filter((t) => t.id !== targetId));
        setShowModal(false);
        setTargetId(null);
    };

    //모달 취소: 닫기만
    const cancelDelete = () => {
        setShowModal(false);
        setTargetId(null);
    };

    // const handleDelete = (id) => {
    //     setTodos(todos.filter((todo) => todo.id !== id));
    //     setShowModal(false);
    // };

    const handleToggle = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="todo-container">
            <TodoInput onAdd={handleAdd} />
            <TodoList
                todos={todos}
                onDelete={askDelete}
                onToggle={handleToggle}
                onUpdate={() => {}}
            />
            {showModal && (
                <ConfirmModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
