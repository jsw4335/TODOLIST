import React, { useState } from "react";
import { createTeam } from "../api/todo_api";
import "../styles/team_modal.css";

export default function TeamCreateModal({ onClose, onTeamCreated }) {
    const [teamName, setTeamName] = useState("");

    const handleSubmit = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const res = await createTeam(teamName, userId);
            alert(res.message);
            onTeamCreated(); // 팀 생성 후 Sidebar 새로고침
            onClose();
        } catch (err) {
            console.error(err);
            alert("팀 생성 실패!");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>팀 만들기</h3>
                <input
                    type="text"
                    placeholder="팀 이름을 입력해주세요."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <div className="modal-buttons">
                    <button className="btn-primary" onClick={handleSubmit}>
                        만들기
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
