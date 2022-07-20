export type TProductSaleReportBase = {
  productName?: any;
  productCode?: any;
  cateName?: any;
  productId?: any;
  quantity?: any;
  unitPrice?: any;
  unitPriceNoVat?: any;
  unit?: any;
  totalPriceBeforeVat?: any;
  vat?: any;
  discount?: any;
  percent?: any;
  totalBeforeDiscount?: any;
  totalAfterDiscount?: any;
  storeId?: any;
  checkDeal?: any;
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
