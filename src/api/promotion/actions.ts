import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export type TActionBase = {
  actionId?: any;
  actionType?: any;
  discountQuantity?: any;
  discountAmount?: any;
  discountPercentage?: any;
  fixedPrice?: any;
  maxAmount?: any;
  minPriceAfter?: any;
  orderLadderProduct?: any;
  ladderPrice?: any;
  bundlePrice?: any;
  bundleQuantity?: any;
  bundleStrategy?: any;
  delFlg?: any;
  insDate?: any;
  updDate?: any;
  name?: any;
  brandId?: any;
  brand?: any;
  actionProductMapping?: [];
  promotionTier?: [];
  voucherGroup?: [];
};

const get = (params?: any) => request.get<BaseReponse<TActionBase>>(`/actions`, { params });

const actionApi = { get };

export default actionApi;
