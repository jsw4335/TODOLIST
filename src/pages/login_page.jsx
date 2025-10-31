import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login_page.css"; // 스타일 파일 따로 만들기
import { loginUser } from "../api/todo_api";

export default function LoginPage() {
    const [loginId, setLogInId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    // 로그인 버튼 클릭 시 실행
    const handleLogin = async () => {
        if (!loginId || !password) {
            setErrorMsg("아이디와 비밀번호를 확인해주세요");
            return;
        }

        try {
            const res = await loginUser(loginId, password);
            console.log("로그인 응답:", res);

            if (res.loginSuccess && res.pwSuccess) {
                alert(`${res.message}`);
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("loginId", res.loginId);
                localStorage.setItem("token", res.token);
                localStorage.setItem("lastViewPage", res.lastViewPage);
                navigate("/todo", { state: { userId: res.userId } });
            }
        } catch (err) {
            // 400에러가 발생할 경우에는 프론트의 try 부분을 무조건 건너뛴다
            console.error("catch 문 안으로 진입:", err);
            if (
                err.response &&
                err.response.data &&
                err.response.data.message
            ) {
                setErrorMsg("아이디와 비밀번호를 확인해주세요.");
                //alert(err.response.data.message); // 백엔드에서 온 에러 메시지 표시
            } else {
                alert("로그인 중 알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className="login-page">
            <h2 className="login-title">로그인</h2>
            <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={loginId}
                onChange={(e) => {
                    setLogInId(e.target.value);
                    if (errorMsg) setErrorMsg("");
                }}
                className={`login-input ${errorMsg ? "input-error" : ""}`} // 에러 시 테두리 빨강
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg("");
                }}
                className={`login-input ${errorMsg ? "input-error" : ""}`} // 에러 시 테두리 빨강
            />
            {errorMsg && <p className="error-text">{errorMsg}</p>}
            <button onClick={handleLogin} className="login-btn">
                로그인
            </button>
            <button
                onClick={() => navigate("/signup")}
                className="login-signup-btn"
            >
                회원가입
            </button>
        </div>
    );
}
