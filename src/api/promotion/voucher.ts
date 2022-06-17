import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

// export const VOUCHER_TYPE_DATA = [
//   {
//     value: 1,
//     label: 'Giảm 50%'
//   },
//   {
//     value: 2,
//     label: 'giảm 30k'
//   },
//   {
//     value: 3,
//     label: 'TestGiftVoucher'
//   },
//   {
//     value: 4,
//     label: 'Giam 50k'
//   },
//   {
//     value: 5,
//     label: 'TestGiftVoucher'
//   },
//   {
//     value: 6,
//     label: 'Giam 50k'
//   },
//   {
//     value: 7,
//     label: 'FREESHIP 100%'
//   },
//   {
//     value: 8,
//     label: 'FREESHIP'
//   },
//   {
//     value: 9,
//     label: 'Free Ship'
//   },
//   {
//     value: 10,
//     label: 'Giam gia don hang'
//   }
// ];

// enum actionTypeEnum {
//   Discoutn_50_Percents = 1,
//   Discount_30K = 2,
//   Gift_Voucher_Test = 3,
//   Test_Passio = 4,
//   Test_Gift_Voucher = 5,
//   Discount_50K = 6,
//   FreeShip_100_Percent = 7,
//   FREE_Ship = 8,
//   Free_Ship = 9,
//   Discount_After = 10
//
export interface VoucherActionType {
  name: string;
}

export type TVoucherBase = {
  index?: number;
  voucherName?: string;
  action?: VoucherActionType[];
  quantity?: number;
  redempedQuantity?: any;
  usedQuantity?: any;
};

const getVoucher = (params?: any) =>
  request.get<BaseReponse<TVoucherBase>>(`/voucher-groups`, { params });

const voucherApi = { getVoucher };

export default voucherApi;
