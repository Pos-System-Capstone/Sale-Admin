import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export const PROMOTION_TYPE_DATA = [
  {
    value: 1,
    label: 'Amount order'
  },
  {
    value: 2,
    label: 'Amount order 2'
  },
  {
    value: 3,
    label: 'Amount order 3'
  },
  {
    value: 4,
    label: 'Amount order 4'
  },
  {
    value: 5,
    label: 'Amount order 5'
  },
  {
    value: 6,
    label: 'Amount order 6'
  },
  {
    value: 7,
    label: 'Amount order 7'
  },
  {
    value: 8,
    label: 'Amount order 9'
  },
  {
    value: 9,
    label: 'Amount order 8'
  }
];

enum actionTypeEnum {
  Amount_Order = 1,
  Percentage_Order = 2,
  Shipping = 3,
  Amount_Product = 4,
  Percentage_Product = 5,
  Unit = 6,
  Fixed = 7,
  Ladder = 8,
  Bundle = 9
}

export type TPromotionBase = {
  promotionName?: string;
  startDate?: string;
  actionType?: actionTypeEnum;
  postActionType?: string;
  status?: string;
};

const getPromotion = (params?: any) =>
  request.get<BaseReponse<TPromotionBase>>(`/promotions`, { params });

const promotionApi = { getPromotion };

export default promotionApi;
