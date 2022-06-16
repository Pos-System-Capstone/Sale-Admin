// const promotionTypeList: string[] = ['Using voucher', 'Using code', 'Automatic'];

import useLocales from 'hooks/useLocales';

// promotionTypeList = ['Using voucher', 'Using code', 'Automatic'];
// Note: recommend using [{name: 'Using voucher',value: voucher},{name: 'Using code',value: code}]
const promotionTypeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.createPromotion.usingVoucher')}`,
    `${translate('promotionSystem.promotion.createPromotion.usingCode')}`,
    `${translate('promotionSystem.promotion.createPromotion.automatic')}`
  ];
};

// const kindActionList: string[] = ['Discount', 'Gift'];

const kindActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.createPromotion.discount')}`,
    `${translate('promotionSystem.promotion.createPromotion.gift')}`
  ];
};

// const discountActionList: string[] = [
//   'Discount amount of order',
//   'Discount amount of item',
//   'Fixed price of item',
//   'Discount percent of order',
//   'Discount percent of item',
//   'Ladder price of item',
//   'Discount shipping fee of order',
//   'Discount unit of item',
//   'Bundle price of item'
// ];

const discountActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfOrder'
    )}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountPercentageOfOrder'
    )}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountShippingFeeOfOrder'
    )}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfItem'
    )}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountPercentOfItem'
    )}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.discountUnitOfItem'
    )}`,
    `${translate('promotionSystem.promotion.createPromotion.discountActionType.fixedPriceOfItem')}`,
    `${translate(
      'promotionSystem.promotion.createPromotion.discountActionType.ladderPriceOfItem'
    )}`,
    `${translate('promotionSystem.promotion.createPromotion.discountActionType.bundlePriceOfItem')}`
  ];
};

// const giftActionList: string[] = [
//   'Gift products',
//   'Gift vouchers',
//   'Gift points',
//   'Gift game code'
// ];

const giftActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftVoucher')}`,
    `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftProduct')}`,
    `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftPoint')}`,
    `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftGameCode')}`
  ];
};

const timeFrameList: string[] = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
];

// const particularDayList: string[] = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday'
// ];

const particularDayList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.dayInWeek.sunday')}`,
    `${translate('promotionSystem.dayInWeek.monday')}`,
    `${translate('promotionSystem.dayInWeek.tuesday')}`,
    `${translate('promotionSystem.dayInWeek.wednesday')}`,
    `${translate('promotionSystem.dayInWeek.thursday')}`,
    `${translate('promotionSystem.dayInWeek.friday')}`,
    `${translate('promotionSystem.dayInWeek.saturday')}`
  ];
};

// const paymentMethodList: string[] = [
//   'Cash',
//   'Credit Cards',
//   'Bank Transfers',
//   'eWallets',
//   'Mobile Banking',
//   'COD'
// ];

const paymentMethodList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.paymentMethodType.cash')}`,
    `${translate('promotionSystem.promotion.settings.paymentMethodType.creditCard')}`,
    `${translate('promotionSystem.promotion.settings.paymentMethodType.bankTransfer')}`,
    `${translate('promotionSystem.promotion.settings.paymentMethodType.eWallet')}`,
    `${translate('promotionSystem.promotion.settings.paymentMethodType.mobileBanking')}`,
    `${translate('promotionSystem.promotion.settings.paymentMethodType.cod')}`
  ];
};

// const targetCustomerList: string[] = ['Guest', 'Membership'];
const targetCustomerList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.targetCustomerType.guest')}`,
    `${translate('promotionSystem.promotion.settings.targetCustomerType.membership')}`
  ];
};
// const genderList: string[] = ['Male', 'Female'];
const genderList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.genderType.male')}`,
    `${translate('promotionSystem.promotion.settings.genderType.female')}`
  ];
};
// const saleModeList: string[] = ['Eat-in', 'Take-away', 'Delivery'];

const saleModeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.saleModeType.eatIn')}`,
    `${translate('promotionSystem.promotion.settings.saleModeType.takeAway')}`,
    `${translate('promotionSystem.promotion.settings.saleModeType.delivery')}`
  ];
};

// const applyByList: string[] = ['Store', 'Online'];
const applyByList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.applyByType.store')}`,
    `${translate('promotionSystem.promotion.settings.applyByType.online')}`
  ];
};
// const exclusiveList: string[] = ['None', 'Level', 'Global'];
const exclusiveList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.exclusiveType.none')}`,
    `${translate('promotionSystem.promotion.settings.exclusiveType.level')}`,
    `${translate('promotionSystem.promotion.settings.exclusiveType.global')}`
  ];
};
// const memberLevelList: string[] = ['Level 1', 'Level 2'];
const memberLevelList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.promotion.settings.memberLevelType.level1')}`,
    `${translate('promotionSystem.promotion.settings.memberLevelType.level2')}`
  ];
};
export {
  promotionTypeList,
  particularDayList,
  paymentMethodList,
  kindActionList,
  discountActionList,
  giftActionList,
  targetCustomerList,
  timeFrameList,
  genderList,
  saleModeList,
  applyByList,
  exclusiveList,
  memberLevelList
};
