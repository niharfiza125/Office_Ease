import apiClient from './apiClient';

const logoutAdmin = async () => {
  try {
    await apiClient.post('/admin/logout');
  } catch (error) {
    console.error('Logout API failed:', error);
  } finally {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  }
};

export default logoutAdmin;
