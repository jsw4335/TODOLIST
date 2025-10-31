import { useState, useEffect } from "react";
import TodoInput from "./todo_input";
import TodoList from "./todo_list";
import ConfirmModal from "./confirm_modal";
import "../styles/common.css";
//api 불러오기
import {
    // 개인용
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from "../api/todo_api"; // 나중에 추가

export default function TodoContainer({ teamId }) {
    const [todos, setTodos] = useState([]); //실제 데이터를 저장 하는 곳
    const [showModal, setShowModal] = useState(false); //모달 표시상태
    const [targetId, setTargetId] = useState(null); //삭제 대상 id 저장

    const fetchTodos = async () => {
        try {
            const data = await getTodos(teamId);
            setTodos(data);
        } catch (err) {
            console.error("할 일 목록 불러오기 실패:", err);
        }
    };
    useEffect(() => {
        //페이지 진입시 코드

        fetchTodos();
    }, [teamId]);
    // 할 일 추가
    const handleAdd = async (title) => {
        try {
            await addTodo(title, teamId);
            await fetchTodos();
        } catch (err) {
            console.error("할 일 추가 실패:", err);
        }
    };
    // 할 일 수정
    const handleUpdate = async (id, value, completed) => {
        await updateTodo(id, value, completed, teamId);
        await fetchTodos();
    };

    const askDelete = (id) => {
        setTargetId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteTodo(targetId, teamId);
            await fetchTodos();
        } catch (err) {
            console.error("할 일 삭제 실패:", err);
        } finally {
            setShowModal(false);
            setTargetId(null);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setTargetId(null);
    };

    return (
        <div className="todo-container">
            <TodoInput onAdd={handleAdd} />
            <TodoList
                todos={todos}
                onDelete={askDelete}
                onUpdate={handleUpdate}
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
