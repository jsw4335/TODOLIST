import React from "react";
import "../../styles/modal.css";

/**
 * @param {boolean} show - 모달 표시 여부
 * @param {function} onClose - 배경 클릭 또는 취소 버튼 시 닫기
 * @param {string} title - 모달 제목 (선택)
 * @param {ReactNode} children - 모달 내부 컨텐츠
 * @param {ReactNode} footer - 버튼 등 하단부 컨텐츠
 * @param {string} width - 모달 너비 (기본값 360px)
 * @param {string} height - 모달 높이 (선택)
 */
export default function Modal({
    show = true,
    onClose,
    title,
    children,
    footer,
    width = "360px",
    height,
}) {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-box"
                style={{ width, height }}
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
            >
                {title && <h3 className="modal-title">{title}</h3>}

                <div className="modal-content">{children}</div>

                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}
