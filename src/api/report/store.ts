import { StoreBase } from 'types/report/store';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.report;

const get = (params?: any) => request.get<BaseReponse<StoreBase>>(`stores`, { params });

const storeApi = { get };

export default storeApi;
