import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import TodoContainer from "../components/todo_container";
import "../styles/todo_page.css";

export default function TodoPage() {
    const navigate = useNavigate();
    const [teamId, setTeamId] = useState(
        Number(localStorage.getItem("lastViewPage")) || 0
    );
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        if (!userId) {
            alert("로그인이 필요합니다!");
            navigate("/login");
        }
    }, [userId, navigate]);

    const handleSelect = (view) => {
        if (view === "personal") {
            setTeamId(0);
            localStorage.setItem("lastViewPage", 0);
        } else if (view.startsWith("team-")) {
            const id = Number(view.split("-")[1]);
            setTeamId(id);
            localStorage.setItem("lastViewPage", id);
        }
    };

    return (
        <div className="todo-page">
            <Sidebar onSelect={handleSelect} setTeamId={setTeamId} />
            <TodoContainer userId={userId} teamId={teamId} />
        </div>
    );
}
