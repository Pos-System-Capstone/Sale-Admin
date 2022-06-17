import useLocales from 'hooks/useLocales';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export const PROMOTION_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    {
      value: 1,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfOrder'
      )}`
    },
    {
      value: 2,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentageOfOrder'
      )}`
    },
    {
      value: 3,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountShippingFeeOfOrder'
      )}`
    },
    {
      value: 4,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfItem'
      )}`
    },
    {
      value: 5,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentOfItem'
      )}`
    },
    {
      value: 6,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountUnitOfItem'
      )}`
    },
    {
      value: 7,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.fixedPriceOfItem'
      )}`
    },
    {
      value: 8,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.ladderPriceOfItem'
      )}`
    },
    {
      value: 9,
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.bundlePriceOfItem'
      )}`
    }
  ];
};

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
