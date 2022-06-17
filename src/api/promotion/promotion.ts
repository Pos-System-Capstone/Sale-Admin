import useLocales from 'hooks/useLocales';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export const DISCOUNT_TYPE_DATA = () => {
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
export const STATUS_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    { value: 1, label: `DRAFT` },
    { value: 2, label: 'PUBLISH' },
    { value: 3, label: 'UNPUBLISH' },
    { value: 4, label: 'EXPIRED' }
  ];
};
export const PROMOTION_TYPE_DATA = () => {
  const { translate } = useLocales();
  return [
    { value: 1, label: `USING VOUCHER` },
    { value: 2, label: 'USING CODE' },
    { value: 3, label: 'AUTOMATIC' },
    { value: null, label: '' }
  ];
};
export enum discountActionTypeEnum {
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

export enum giftActionTypeEnum {
  Gift_Product = 1,
  Gift_Voucher = 2,
  Gift_Point = 3,
  Gift_Game_code = 4
}

export enum promotionTypeEnum {
  Using_Voucher = 1,
  Using_Code = 2,
  Automatic = 3
}

export enum statusTypeEnum {
  Draft = 1,
  Publish = 2,
  Un_Publish = 3,
  Expired = 4
}

export type TPromotionBase = {
  promotionId?: string;
  brandId?: string;
  promotionCode?: string;
  promotionName?: string;
  actionType?: discountActionTypeEnum;
  postActionType?: string;
  imgUrl?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  exclusive?: any;
  applyBy?: any;
  saleMode?: any;
  gender?: number;
  paymentMethod?: number;
  forHoliday?: number;
  forMembership?: number;
  dayFilter?: number;
  hourFilter?: number;
  status?: statusTypeEnum;
  delFlg?: boolean;
  insDate?: Date;
  updDate?: Date;
  hasVoucher?: boolean;
  isAuto?: boolean;
  promotionType?: promotionTypeEnum;
  brand?: any;
};

const getPromotion = (params?: any) =>
  request.get<BaseReponse<TPromotionBase>>(`/promotions`, { params });

const promotionApi = { getPromotion };

export default promotionApi;
