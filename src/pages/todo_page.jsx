import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import TodoContainer from "../components/todo_container";

export default function TodoPage() {
    //로그인 하지 않은 사용자가 /todo에 접근하면 자동으로
    //로그인이 필요하다고 alert를 띄우고 로그인 페이지로 이동함
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다!");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="todo-page">
            <Sidebar />
            <TodoContainer />
        </div>
    );
}
