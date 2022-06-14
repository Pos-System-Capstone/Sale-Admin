const promotionTypeList: string[] = ['Using voucher', 'Using code', 'Automatic'];

const kindActionList: string[] = ['Discount', 'Gift'];

const discountActionList: string[] = [
  'Discount amount of order',
  'Discount amount of item',
  'Fixed price of item',
  'Discount percent of order',
  'Discount percent of item',
  'Ladder price of item',
  'Discount shipping fee of order',
  'Discount unit of item',
  'Bundle price of item'
];

const giftActionList: string[] = [
  'Gift products',
  'Gift vouchers',
  'Gift points',
  'Gift game code'
];

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

const particularDayList: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const paymentMethodList: string[] = [
  'Cash',
  'Credit Cards',
  'Bank Transfers',
  'eWallets',
  'Mobile Banking',
  'COD'
];

const targetCustomerList: string[] = ['Guest', 'Membership'];

const genderList: string[] = ['Male', 'Female'];

const saleModeList: string[] = ['Eat-in', 'Take-away', 'Delivery'];

const applyByList: string[] = ['Store', 'Online'];

const exclusiveList: string[] = ['None', 'Level', 'Global'];

const memberLevelList: string[] = ['Level 1', 'Level 2'];

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     width: 300
//   },
//   indeterminateColor: {
//     color: '#f50057'
//   },
//   selectAllText: {
//     fontWeight: 500
//   },
//   selectedAll: {
//     backgroundColor: 'rgba(0, 0, 0, 0.08)',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 0, 0, 0.08)'
//     }
//   }
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   },
//   getContentAnchorEl: null,
//   anchorOrigin: {
//     vertical: 'bottom',
//     horizontal: 'center'
//   },
//   transformOrigin: {
//     vertical: 'top',
//     horizontal: 'center'
//   },
//   variant: 'menu'
// };

// const options = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ];

export {
  promotionTypeList,
  discountActionList,
  giftActionList,
  particularDayList,
  paymentMethodList,
  targetCustomerList,
  timeFrameList,
  genderList,
  saleModeList,
  applyByList,
  exclusiveList,
  kindActionList,
  memberLevelList
};
