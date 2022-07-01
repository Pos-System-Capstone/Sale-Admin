import { TProductSaleReportBase } from 'types/report/productSale';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getProductSale = (params?: any) =>
  request.get<BaseReponse<TProductSaleReportBase>>('/product-report', { params });

const productSaleApi = { getProductSale };

export default productSaleApi;
