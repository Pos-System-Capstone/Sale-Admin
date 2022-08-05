export type TPaymentReportBase = {
  storeName?: any;
  cash?: number;
  creditCard?: number;
  creditCardUse?: number;
  bank?: number;
  momo?: number;
  grabPay?: number;
  grabFood?: number;
  vnPay?: number;
  baemin?: number;
  shopeePay?: number;
  zaloPay?: number;
};

export type TPaymentReportStore = {
  date?: Date;
  cash?: number;
  creditCard?: number;
  creditCardUse?: number;
  bank?: number;
  momo?: number;
  grabPay?: number;
  grabFood?: number;
  vnPay?: number;
  baemin?: number;
  shopeePay?: number;
  zaloPay?: number;
};
