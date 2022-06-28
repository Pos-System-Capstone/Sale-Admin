import { StoreBase } from 'types/report/store';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) => request.get<StoreBase[]>(`stores`, { params });

const storeApi = { get };

export default storeApi;
