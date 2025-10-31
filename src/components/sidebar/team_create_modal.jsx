import React, { useState } from "react";
import { createTeam } from "../../api/todo_api";
import Modal from "./modal";

export default function TeamCreateModal({ onClose, onTeamCreated }) {
    const [teamName, setTeamName] = useState("");

    const handleCreate = async () => {
        try {
            // const userId = localStorage.getItem("userId");
            const res = await createTeam(teamName);
            alert(res.message);
            onTeamCreated?.(); // 새로고침용 콜백
            onClose();
        } catch (err) {
            console.error(err);
            alert("팀 생성 실패");
        }
    };

    return (
        <Modal
            show
            onClose={onClose}
            title="팀 만들기"
            footer={
                <>
                    <button className="btn-secondary" onClick={onClose}>
                        취소
                    </button>
                    <button className="btn-primary" onClick={handleCreate}>
                        만들기
                    </button>
                </>
            }
        >
            <input
                type="text"
                placeholder="팀 이름을 입력해주세요."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
            />
        </Modal>
    );
}
