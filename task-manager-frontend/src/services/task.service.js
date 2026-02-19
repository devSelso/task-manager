import api from './api';

export const TaskService = {
  getAll: () => api.get('/tasks'),
  create: (task) => api.post('/tasks', task),
  update: (id, task) => api.put(`/tasks/${id}`, task),
  delete: (id) => api.delete(`/tasks/${id}`),
  updateOrder: (tasks) => api.post('/tasks/reorder', { tasks })
};