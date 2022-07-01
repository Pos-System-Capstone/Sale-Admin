import { TProductCategoryBase } from 'types/report/productSaleCategory';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getProductSale = (params?: any) =>
  request.get<BaseReponse<TProductCategoryBase>>('/category-report', { params });

const productApi = { getProductSale };

export default productApi;
