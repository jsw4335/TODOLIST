import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login_page.css"; // 스타일 파일 따로 만들기

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    // 로그인 버튼 클릭 시 실행
    const handleLogin = async () => {
        if (!userId || !pw) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        // try {
        //     //  백엔드 주소에 맞게 수정 (예: http://localhost:1234/user/login)
        //     const response = await axios.post(
        //         "http://localhost:1234/user/login",
        //         {
        //             userId,
        //             pw,
        //         }
        //     );

        //     console.log("로그인 응답:", response.data);

        //     // 토큰 또는 사용자 정보가 응답으로 온다면 저장
        //     if (response.data.token) {
        //         localStorage.setItem("token", response.data.token);
        //     }

        //     alert("로그인 성공!");
        //     navigate("/todo"); // TodoPage로 이동
        // } catch (err) {
        //     console.error("로그인 실패:", err);
        //     alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        // }
        // };

        // 🔹 localStorage에서 유저 데이터 가져오기
        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log("저장된 유저 목록:", users);

        // 🔹 입력한 userId, pw와 일치하는 유저 찾기
        const foundUser = users.find(
            (user) => user.userId === userId && user.pw === pw
        );

        if (foundUser) {
            alert(`환영합니다, ${foundUser.name}님!`);
            localStorage.setItem("token", "fake-token"); // 임시 로그인 상태 저장
            navigate("/todo");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="login-page">
            <h2 className="login-title">로그인</h2>
            <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="login-input"
            />
            <button onClick={handleLogin} className="login-btn">
                로그인
            </button>
            <button onClick={() => navigate("/signup")} className="signup-btn">
                회원가입
            </button>
        </div>
    );
}
