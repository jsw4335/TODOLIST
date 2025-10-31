import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); //로그인 성공 시 localStorage에 저장해둔 JWT토큰을 가져온다
        console.log("요청 헤더 확인:", token ? `Bearer ${token}` : "토큰 없음");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 헤더 요청에 JWT 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const joinUser = async (loginId, password) => {
    const res = await api.post("/users", { loginId, password });
    return res.data;
};

export const loginUser = async (loginId, password) => {
    const res = await api.post("/users/login", { loginId, password });
    return res.data;
};

export const logoutUser = async (userId, lastViewPage) => {
    const res = await api.post("/users/logout", { userId, lastViewPage });
    return res.data;
};

export const getTeams = async () => {
    const res = await api.get(`/users/team`);
    return res.data;
};

export const getTodos = async (teamId = 0) => {
    const res = await api.get(`/todos`, {
        params: teamId ? { teamId } : {},
    });
    return res.data.map((t) => ({
        id: t.id,
        title: t.todoContent,
        completed: t.todoCompleted === "COMPLETED",
    }));
};

export const addTodo = async (todoContent, teamId = 0) => {
    const res = await api.post(
        `/todos`,
        { todoContent },
        {
            params: teamId ? { teamId } : {},
        }
    );
    return res.data;
};

export const updateTodo = async (
    todoId,
    todoContent,
    isCompleted,
    teamId = 0
) => {
    const res = await api.put(
        `/todos/${todoId}`,
        {
            todoContent,
            selectedTodoCompleted: isCompleted ? "COMPLETED" : "PENDING",
        },
        {
            params: teamId ? { teamId } : {},
        }
    );
    return res.data;
};

export const deleteTodo = async (todoId, teamId = 0) => {
    const res = await api.delete(`/todos/${todoId}`, {
        params: teamId ? { teamId } : {},
    });
    return res.data;
};

export const createTeam = async (team_name) => {
    const userId = localStorage.getItem("userId"); // ✅ 로그인한 사용자 ID 불러오기
    const res = await api.post(`/teams`, { teamName: team_name, userId });
    return res.data;
};

export const getTeamTodos = async (teamId) => {
    const res = await api.get(`/teams/${teamId}/todos`);
    const data = res.data;

    if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return [];
    }
    return res.data.map((t) => ({
        id: t.id,
        title: t.todoContent,
        completed: !!t.todoCompleted,
    }));
};

export const addTeamTodo = async (teamId, todoContent) => {
    const res = await api.post(`/teams/${teamId}/todos`, { todoContent });
    return res.data;
};

export const updateTeamTodo = async (teamId, id, todoContent) => {
    const res = await api.put(`/teams/${teamId}/todos/${id}`, { todoContent });
    return res.data;
};

export const deleteTeamTodo = async (teamId, id) => {
    const res = await api.delete(`/teams/${teamId}/todos/${id}`);
    return res.data;
};

export const getTeamMembers = async (teamId) => {
    const res = await api.get(`/teams/${teamId}`);
    return res.data;
};

export const inviteTeamMember = async (teamId, loginId) => {
    const res = await api.post(`/teams/${teamId}/members`, { loginId });
    return res.data;
};

export const deleteTeamMember = async (teamId, userId) => {
    const res = await api.delete(`/teams/${teamId}/members/${userId}`, {
        data: { userId },
    });
    return res.data;
};

export const deleteTeam = async (teamId) => {
    const res = await api.delete(`/teams/${teamId}`);
    return res.data;
};
