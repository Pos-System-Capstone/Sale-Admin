import { axiosClientFactory, AxiosClientFactoryEnum } from 'utils/axios';

axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.TRADING);

const getTrading = (collectionId: number, params?: any) =>
  request.get<BaseReponse<TProductCollection>>(`/admin/collections/${collectionId}/products`);

const tradingApi = {};
