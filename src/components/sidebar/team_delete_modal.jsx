import React from "react";
import Modal from "./modal";
import { deleteTeam } from "../../api/todo_api";

export default function TeamDeleteModal({ teamId, onClose, onDeleted }) {
    const handleDelete = async () => {
        try {
            await deleteTeam(teamId);
            alert("팀이 삭제되었습니다.");
            //onDeleted(); // Sidebar로 알려서 팀 목록 갱신
            if (onDeleted) await onDeleted();
            if (onClose) onClose(); // 모달 닫기
        } catch (err) {
            console.error("팀 삭제 실패:", err);
            alert("팀 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <Modal
            show
            onClose={onClose}
            title="팀 삭제"
            footer={
                <>
                    <button className="btn-primary" onClick={handleDelete}>
                        삭제
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        취소
                    </button>
                </>
            }
        >
            정말 이 팀을 삭제하시겠습니까?
            <br />
            삭제 후에는 복구할 수 없습니다.
        </Modal>
    );
}
