import request from 'utils/axios';

export const getStores = (params) => request.get('/stores', { params });
