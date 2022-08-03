import { TStore } from 'types/report/storeReport';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) => request.get<TStore[]>('/stores', { params });

const storeReportApi = { get };

export default storeReportApi;
