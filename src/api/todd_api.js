import axios from "axios";

const BASE_URL = "http://localhost:3000"; // 백엔드 서버 주소 (포트 확인!)

export const getTodos = async () => {
    const res = await axios.get(`${BASE_URL}/todos`);
    return res.data;
};

export const addTodo = async (title) => {
    const res = await axios.post(`${BASE_URL}/todos`, { title });
    return res.data;
};

export const updateTodo = async (id, updatedData) => {
    const res = await axios.put(`${BASE_URL}/todos/${id}`, updatedData);
    return res.data;
};

export const deleteTodo = async (id) => {
    const res = await axios.delete(`${BASE_URL}/todos/${id}`);
    return res.data;
};
