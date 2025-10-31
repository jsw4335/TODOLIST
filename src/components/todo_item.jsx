import { useState } from "react";
import "../styles/todo_item.css";
export default function TodoItem({ todo, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(todo.title);

    const handleUpdate = () => {
        if (!value.trim()) return;
        onUpdate(todo.id, value, todo.completed);
        setEditing(false);
    };

    return (
        <div className={`todo-item ${editing ? "editing" : ""}`}>
            {!editing && (
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                        onUpdate(todo.id, todo.title, !todo.completed)
                    }
                />
            )}
            {editing ? (
                <>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="edit-input"
                    />
                    <div className="item-buttons">
                        <button className="confirm" onClick={handleUpdate}>
                            완료
                        </button>
                        <button
                            className="cancel"
                            onClick={() => setEditing(false)}
                        >
                            취소
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span>{todo.title}</span>
                    <div className="item-buttons">
                        {!todo.completed && (
                            <button
                                className="edit"
                                onClick={() => setEditing(true)}
                            >
                                수정
                            </button>
                        )}
                        <button
                            className="delete"
                            onClick={() => onDelete(todo.id)}
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
