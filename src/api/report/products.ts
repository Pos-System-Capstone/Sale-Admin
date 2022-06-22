import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

export type TProductReportBase = {
  productId?: any;
  productName?: any;
  quantity?: any;
  percent?: any;
  totalBeforeDiscount?: any;
  discount?: any;
  totalAfterDiscount?: any;
};

const getProductReport = (params: any = {}) =>
  request.get<BaseReponse<TProductReportBase>>('/product-report', params);

const productApi = { getProductReport };

export default productApi;
