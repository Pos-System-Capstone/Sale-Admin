import { TPaymentOverviewBase, TRevenueOverviewBase } from 'types/report/revenueOverview';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const getRevenueOverview = (params?: any) =>
  request.get<TRevenueOverviewBase>('/revenue-report/overview', { params });

const getPaymentOverview = (params?: any) =>
  request.get<TPaymentOverviewBase>('/revenue-report/overview-payment', { params });

const revenueApi = { getRevenueOverview, getPaymentOverview };

export default revenueApi;
