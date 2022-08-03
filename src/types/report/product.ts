export type TProductSaleReportBase = {
  productName?: string;
  productCode?: any;
  cateName?: string;
  productId?: any;
  quantity?: number;
  unitPrice?: number;
  unitPriceNoVat?: number;
  unit?: number;
  totalPriceBeforeVat?: number;
  vat?: number;
  discount?: number;
  percent?: number;
  totalBeforeDiscount?: number;
  totalAfterDiscount?: number;
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
