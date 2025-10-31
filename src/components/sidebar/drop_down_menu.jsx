import React from "react";
import "../../styles/sidebar.css";

/**활용법
 * @param {Array} items - [{ label: "초대하기", onClick: fn }, { label: "삭제하기", onClick: fn }]
 * @param {string} className - 추가 스타일 클래스 (선택)
 */
export default function DropDownMenu({ items, className = "" }) {
    return (
        <div className={`dropdown-menu ${className}`}>
            {items.map((item, index) => (
                <p key={index} onClick={item.onClick}>
                    {item.label}
                </p>
            ))}
        </div>
    );
}
