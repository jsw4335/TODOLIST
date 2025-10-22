import React, { useState } from "react";
import { createTeam } from "../api/todo_api";

export default function TeamCreatePage() {
    const [teamName, setTeamName] = useState("");
    const [message, setMessage] = useState("");

    const handleCreate = async () => {
        try {
            const userId = localStorage.getItem("userId"); // 로그인 후 저장된 ID
            const res = await createTeam(teamName, userId);
            setMessage(res.message);
        } catch (err) {
            console.error(err);
            setMessage("팀 생성 실패");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>팀 생성하기</h2>
            <input
                type="text"
                placeholder="팀 이름 입력"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={handleCreate}>생성</button>
            <p>{message}</p>
        </div>
    );
}
