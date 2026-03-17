import api from './client';

export const getStudents = (teacherId = null) => {
  const params = teacherId ? { teacher_id: teacherId } : {};
  return api.get('/students/', { params });
};

export const createStudent = (data) => api.post('/students/', data);

export const updateStudent = (studentId, data) => api.put(`/students/${studentId}`, data);

export const deleteStudent = (studentId) => api.delete(`/students/${studentId}`);
