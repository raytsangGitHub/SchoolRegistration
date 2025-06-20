import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5191/api', // Adjust port if needed
});

export const getAllStudents = () => api.get('/students');
export const registerStudent = (data) => api.post('/students', data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);