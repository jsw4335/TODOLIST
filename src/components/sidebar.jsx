import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTeams, logoutUser } from "../api/todo_api";
import TeamCreateModal from "./team_create_modal";
import "../styles/sidebar.css";

export default function Sidebar({ onSelect }) {
    const [teams, setTeams] = useState([]);
    const [showLogout, setShowLogout] = useState(false);
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null); // ✅ 팀원 관리용 모달

    const userId = localStorage.getItem("userId");
    const loginId = localStorage.getItem("loginId"); // 로그아웃 부분에 띄워주기 위해 추가
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

    // 로그아웃 함수 추가
    const handleLogout = async () => {
        try {
            // 현재 보고 있는 페이지가 개인(0)인지 팀 페이지인지 구분
            const lastViewPage = localStorage.getItem("lastViewPage") || 0;

            const res = await logoutUser(userId, lastViewPage);
            alert(res.message);

            // 로컬 데이터 정리
            localStorage.clear();

            // 로그인 페이지로 이동
            navigate("/login");
        } catch (error) {
            console.error("로그아웃 오류:", error);
            alert("로그아웃 중 문제가 발생했습니다.");
        }
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

                {/* 팀 목록 */}
                {teams.map((team) => (
                    <div key={team.id} className="team-item-container">
                        <button
                            className="sidebar-btn"
                            onClick={() => onSelect(`team-${team.id}`)}
                        >
                            {team.team_name}의 할 일 목록
                        </button>
                        {/* ✅ 팀원 관리 버튼 추가 */}
                        <button
                            className="team-more-btn"
                            onClick={() => setSelectedTeamId(team.id)}
                        >
                            ...
                        </button>
                    </div>
                ))}

                <button
                    className="sidebar-btn create-team"
                    onClick={() => setShowCreateTeamModal(true)}
                >
                    팀 만들기
                </button>
            </div>

            <div className="sidebar-bottom">
                <span className="login-id">{loginId && `ID: ${loginId}`}</span>
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

            {/* ✅ 팀 생성 모달 */}
            {showCreateTeamModal && (
                <TeamCreateModal
                    onClose={() => setShowCreateTeamModal(false)}
                    onTeamCreated={fetchTeams}
                />
            )}

            {/* ✅ 팀원 관리 모달 */}
            {selectedTeamId && (
                <TeamCreateModal
                    teamId={selectedTeamId}
                    onClose={() => setSelectedTeamId(null)}
                />
            )}
        </div>
    );
}
