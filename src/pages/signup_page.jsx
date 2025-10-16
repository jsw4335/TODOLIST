import { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup_page.css";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name || !userId || !pw) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        // api 연결 후 주석해제할 코드
        // try {
        //     const response = await axios.post(
        //         "http://localhost:8800/user/signup",
        //         {
        //             name,
        //             userId,
        //             pw,
        //         }
        //     );

        //     console.log("회원가입 응답:", response.data);
        //     alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        //     navigate("/");
        // } catch (err) {
        //     console.error("회원가입 실패:", err);
        //     alert(
        //         "회원가입에 실패했습니다. 아이디 중복 또는 서버 오류일 수 있습니다."
        //     );
        // }
        // };

        // 로컬에 저장할 임시 유저 데이터
        const userData = {
            name,
            userId,
            pw,
        };

        // 기존 저장된 유저 목록 가져오기 (없으면 빈 배열)
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // 중복 아이디 체크
        const isDuplicate = existingUsers.some(
            (user) => user.userId === userId
        );

        if (isDuplicate) {
            alert("이미 존재하는 아이디입니다!");
            return;
        }

        // 새로운 유저 추가 후 다시 저장
        const updatedUsers = [...existingUsers, userData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        console.log("회원가입 데이터:", updatedUsers);

        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/");
    };

    return (
        <div className="signup-page">
            <h2 className="signup-title">회원가입</h2>

            <input
                type="text"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="signup-input"
            />
            <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="signup-input"
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="signup-input"
            />

            <button onClick={handleSignup} className="signup-btn">
                회원가입
            </button>
            <button onClick={() => navigate("/")} className="login-btn">
                로그인으로 돌아가기
            </button>
        </div>
    );
}
