import { TCategory } from 'types/category';
import request from 'utils/axios';
import { generateAPI, generateAPIWithPaging } from './utils';

const getExtraCategoriesFromCateId = (catId: number, params?: any) => {
  return request.get(`/categories/${catId}/extras`, { params });
};

const categoryApi = {
  ...generateAPIWithPaging<TCategory>('categories'),
  getExtraCategoriesFromCateId
};

export default categoryApi;
