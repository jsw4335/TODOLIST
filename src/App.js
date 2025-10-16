import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import TodoPage from "./pages/todo_page";
import LoginPage from "./pages/login_page";
import SignupPage from "./pages/signup_page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/todo" element={<TodoPage />} />
                {/* 나머지 추후에 추가예정 */}
            </Routes>
        </Router>
    );
}

export default App;
