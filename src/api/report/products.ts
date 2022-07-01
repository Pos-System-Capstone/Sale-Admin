import { TProductLineBase, TProductSaleReportBase } from 'types/report/product';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getProductSale = (params?: any) =>
  request.get<BaseReponse<TProductSaleReportBase>>('/product-report', { params });

const getProductLine = (params?: any) =>
  request.get<BaseReponse<TProductLineBase>>('/product-report/product-line', { params });

const productSaleApi = { getProductSale, getProductLine };

export default productSaleApi;
