import Modal from "./sidebar/modal";

export default function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <Modal
            show
            onClose={onCancel}
            title="정말 삭제 하시겠습니까?"
            footer={
                <>
                    <button className="btn-primary" onClick={onConfirm}>
                        확인
                    </button>
                    <button className="btn-secondary" onClick={onCancel}>
                        취소
                    </button>
                </>
            }
        ></Modal>
    );
}
