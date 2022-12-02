import axios from 'axios';

export function getProducts() {
  return axios.get('/products').then(res => res.data);
}

export function getProductDetail(id: number) {
  return axios.get(`/products/${id}`).then(res => res.data);
}
