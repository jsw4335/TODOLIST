import React, { useState, useEffect } from "react";
import {
    getTeamMembers,
    inviteTeamMember,
    deleteTeamMember,
} from "../api/todo_api";
import "../styles/team_modal.css";

export default function TeamCreateModal({ teamId, onClose }) {
    const [members, setMembers] = useState([]);
    const [inviteId, setInviteId] = useState("");

    useEffect(() => {
        console.log("📌 [TeamCreateModal] teamId:", teamId); // ✅ 추가
        loadMembers();
    }, []);
    // useEffect(() => {
    //     loadMembers();
    // }, []);

    const loadMembers = async () => {
        const data = await getTeamMembers(teamId);
        setMembers(data);
    };

    const handleInvite = async () => {
        const res = await inviteTeamMember(teamId, inviteId);
        alert(res.message);
        if (res.inviteSuccess) loadMembers();
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        const res = await deleteTeamMember(teamId, userId);
        alert(res.message);
        if (res.deleteSuccess) loadMembers();
    };

    return (
        <div className="team-modal">
            <h2>팀원 관리</h2>
            <div className="member-list">
                {members.map((m) => (
                    <div key={m.userId} className="member-item">
                        <span>{m.login_id}</span>
                        <button onClick={() => handleDelete(m.userId)}>
                            🗑️
                        </button>
                    </div>
                ))}
            </div>

            <div className="invite-section">
                <input
                    type="text"
                    placeholder="초대할 아이디 입력"
                    value={inviteId}
                    onChange={(e) => setInviteId(e.target.value)}
                />
                <button onClick={handleInvite}>초대</button>
            </div>

            <button className="close-btn" onClick={onClose}>
                닫기
            </button>
        </div>
    );
}
