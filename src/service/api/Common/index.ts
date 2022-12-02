import axios from 'axios';

export function getMenuItems() {
  return axios.get('/menu').then(res => res.data);
}
