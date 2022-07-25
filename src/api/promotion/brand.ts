import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export type TPromotionBase = {
  brandId?: any;
  brandCode?: any;
  phoneNumber?: any;
  imgUrl?: any;
  brandName?: any;
  companyName?: any;
  description?: any;
  address?: any;
  delFlg?: any;
  insDate?: any;
  updDate?: any;
  brandEmail?: any;
  account?: any;
  action?: any;
  channel?: any;
  conditionRule?: any;
  gameCampaign?: any;
  gift?: any;
  memberLevel?: any;
  productCategory?: any;
  promotion?: any;
  store?: any;
  transaction?: any;
  voucherGroup?: any;
};

const getAll = (params?: any) => request.get<BaseReponse<TPromotionBase>>(`/brands`, { params });

const brandApi = { getAll };

export default brandApi;
