import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../api/todo_api";
import TeamCreateModal from "./team_create_modal";
import "../styles/sidebar.css";

export default function Sidebar({ onSelect }) {
    const [teams, setTeams] = useState([]);
    const [showLogout, setShowLogout] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const fetchTeams = async () => {
        try {
            const res = await getTeams(userId);
            setTeams(res);
        } catch (err) {
            console.error("팀 목록 불러오기 실패:", err);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        alert("로그아웃되었습니다.");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <button
                    className="sidebar-btn"
                    onClick={() => onSelect("personal")}
                >
                    개인 할 일 목록
                </button>

                {teams.map((team) => (
                    <button
                        key={team.id}
                        className="sidebar-btn"
                        onClick={() => onSelect(`team-${team.id}`)}
                    >
                        {team.team_name}의 할 일 목록
                    </button>
                ))}

                <button
                    className="sidebar-btn create-team"
                    onClick={() => setShowTeamModal(true)}
                >
                    팀 만들기
                </button>
            </div>

            <div className="sidebar-bottom">
                <span className="user-id">{userId && `ID: ${userId}`}</span>
                <div className="more-container">
                    <button
                        className="more-btn"
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        ...
                    </button>
                    {showLogout && (
                        <button className="logout-btn" onClick={handleLogout}>
                            로그아웃
                        </button>
                    )}
                </div>
            </div>

            {showTeamModal && (
                <TeamCreateModal
                    onClose={() => setShowTeamModal(false)}
                    onTeamCreated={fetchTeams}
                />
            )}
        </div>
    );
}
