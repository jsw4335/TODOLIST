import React from "react";
import "../../styles/modal.css";

/**
 * @param {boolean} show
 * @param {function} onClose
 * @param {string} title
 * @param {ReactNode} children
 * @param {ReactNode} footer
 * @param {string} width
 * @param {string} height
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
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h3 className="modal-title">{title}</h3>}

                <div className="modal-content">{children}</div>

                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}
