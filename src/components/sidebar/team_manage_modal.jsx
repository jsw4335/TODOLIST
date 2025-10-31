import React, { useState, useEffect } from "react";
import {
    getTeamMembers,
    inviteTeamMember,
    deleteTeamMember,
} from "../../api/todo_api";
import Modal from "./modal";
import "../../styles/team_manage_modal.css";
import { FaTrashAlt } from "react-icons/fa";

export default function TeamManageModal({ teamId, onClose }) {
    const [members, setMembers] = useState([]);
    const [inviteId, setInviteId] = useState("");

    const loadMembers = async () => {
        if (!teamId) return;
        try {
            const data = await getTeamMembers(teamId);
            setMembers(data);
        } catch (err) {
            console.error("팀원 목록 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        if (teamId) {
            loadMembers();
        }
    }, [teamId]);

    const handleInvite = async () => {
        try {
            const res = await inviteTeamMember(teamId, inviteId);
            if (res.inviteSuccess) {
                alert(res.message);
                loadMembers();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("서버 오류가 발생했습니다.");
            }
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        const res = await deleteTeamMember(teamId, userId);
        alert(res.message);
        if (res.deleteSuccess) loadMembers();
    };

    return (
        <Modal show onClose={onClose} title="팀원 초대하기">
            <div className="manage-modal-content">
                <div className="invite-row">
                    <input
                        type="text"
                        placeholder="초대할 팀원의 아이디를 입력해주세요."
                        value={inviteId}
                        onChange={(e) => setInviteId(e.target.value)}
                    />
                    <button className="btn-primary" onClick={handleInvite}>
                        초대
                    </button>
                </div>

                <div className="member-list">
                    {members.length === 0 ? (
                        <p>아직 팀원이 없습니다.</p>
                    ) : (
                        members.map((m) => (
                            <div key={m.user_id} className="member-item">
                                <span>{m.login_id}</span>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(m.user_id)}
                                >
                                    <FaTrashAlt className="trash-icon" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="footer-right">
                    <button className="btn-secondary" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </Modal>
    );
}
