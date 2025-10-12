import { useState } from "react";

export default function TodoItem({ todo, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo.id, value);
    setEditing(false);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} readOnly />
      {editing ? (
        <>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleUpdate}>완료</button>
          <button onClick={() => setEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="item-buttons">
            <button onClick={() => setEditing(true)}>수정</button>
            <button onClick={() => onDelete(todo.id)}>삭제</button>
          </div>
        </>
      )}
    </div>
  );
}
