import request from '../../utils/axios';

export const createMasterProd = (data) => request.post(`/admin/products`, data);

export const getProdById = (id) => request.get(`/admin/products/${id}`);

export const updateProdById = (id, data) => request.put(`/admin/products/${id}`, data);

export const deleteProdById = (id) => request.delete(`/admin/products/${id}`);

export const getAllProduct = (params = {}) =>
  request.get('/admin/products', {
    params
  });
