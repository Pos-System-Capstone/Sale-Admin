import { TPaymentReportBase } from 'types/report/payment';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) =>
  request.get<BaseReponse<TPaymentReportBase>>('/payments/report', { params });

const paymentApi = { get };

export default paymentApi;
