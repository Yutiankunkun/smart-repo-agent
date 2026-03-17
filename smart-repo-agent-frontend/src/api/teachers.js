import api from './client';

export const getTeachers = () => api.get('/teachers/');

export const createTeacher = (data) => api.post('/teachers/', data);

export const updateTeacher = (teacherId, data) => api.put(`/teachers/${teacherId}`, data);

export const deleteTeacher = (teacherId) => api.delete(`/teachers/${teacherId}`);
