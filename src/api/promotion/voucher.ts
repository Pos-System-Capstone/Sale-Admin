import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

export type VoucherActionType = {
  actionId?: string;
  actionType?: number;
  discountQuantity?: number;
  discountAmount?: number;
  discountPercentage?: number;
  fixedPrice?: number;
  maxAmount?: number;
  minPriceAfter?: number;
  orderLadderProduct?: number;
  ladderPrice?: number;
  bundlePrice?: number;
  bundleQuantity?: number;
  bundleStrategy?: number;
  delFlg?: boolean;
  insDate?: Date;
  updDate?: Date;
  name?: string;
  brandId?: string;
  brand?: any;
  actionProductMapping?: [];
  promotionTier?: PromotionTier[];
  voucherGroup?: [];
};

export type TVoucherBase = {
  voucherGroupId?: string;
  brandId?: string;
  voucherName?: string;
  quantity?: number;
  usedQuantity?: number;
  redempedQuantity?: number;
  delFlg?: boolean;
  insDate?: Date;
  updDate?: Date;
  charset?: string;
  postfix?: string;
  prefix?: string;
  customCharset?: string;
  actionId?: string;
  giftId?: any;
  codeLength?: number;
  imgUrl?: any;
  action?: VoucherActionType[];
  brand?: any;
  gift?: any;
  promotionTier?: PromotionTier[];
  voucher?: [];
};

export type PromotionTier = {
  promotionTierId?: string;
  conditionRuleId?: string;
  actionId?: string;
  promotionId?: string;
  giftId?: any;
  insDate?: Date;
  updDate?: Date;
  summary?: any;
  tierIndex?: number;
  voucherGroupId?: string;
  priority?: number;
  voucherQuantity?: number;
  action?: any;
  conditionRule?: any;
  gift?: any;
  promotion?: any;
};

const getVoucher = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const voucherApi = { getVoucher };

export default voucherApi;
