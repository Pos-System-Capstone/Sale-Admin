export type TProductSaleReportBase = {
  productId?: any;
  productName?: any;
  quantity?: any;
  percent?: any;
  totalBeforeDiscount?: any;
  discount?: any;
  totalAfterDiscount?: any;
  checkDeal?: any;
  storeId?: any;
};

export type TProductLineBase = {
  startTime?: any;
  productId?: number;
  cateId?: number;
  cateName?: any;
  productName?: any;
  quantity?: number;
  quantityAtStore?: number;
  quantityTakeAway?: number;
  quantityDelivery?: number;
  totalPrice?: number;
  percent?: number;
  discount?: number;
  totalOrder?: number;
};

export type TProductListBase = {
  productId?: number;
  productName?: any;
};
