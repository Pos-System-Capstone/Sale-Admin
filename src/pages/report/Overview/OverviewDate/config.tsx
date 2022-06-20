import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import WindowIcon from '@mui/icons-material/Window';
import TimelineIcon from '@mui/icons-material/Timeline';
// I. Bán hàng
const totalSalesRevenue: any = [
  {
    icon: <AttachMoneyIcon />,
    dataIndex: 'TotalRevenue'
  },
  {
    title: 'Doanh thu trước giảm giá (1)',
    dataIndex: 'TotalRevenueWithDiscount',
    highlight: true
  },
  {
    title: 'Giảm giá Passio100 (2.1)',
    dataIndex: 'TotalDiscount100',
    fontSize: 'small'
  },
  {
    title: 'Giảm giá bán hàng (2.2)',
    dataIndex: 'TotalDiscount',
    fontSize: 'small'
  },
  {
    title: 'Tổng giảm giá bán hàng (2) = (2.1) + (2.2)',
    dataIndex: 'TotalDiscount',
    fontSize: 'small'
  },
  {
    title: 'Doanh thu Thực Tế (3)',
    dataIndex: 'TotalRevenue',
    highlight: true
  }
];
const totalSalesInvoice: any = [
  {
    icon: <SyncAltIcon />,
    dataIndex: 'TotalOrder'
  },
  {
    title: 'Tại quán (1)',
    dataIndex: 'TotalOrderAtStore',
    highlight: true
  },
  {
    title: 'Mang đi (2)',
    dataIndex: 'TotalOrderTakeAway'
  },
  {
    title: 'Giao hàng (3)',
    dataIndex: 'TotalOrderDelivery',
    highlight: true
  }
];

// II. Nạp thẻ
const TotalRevenueCardRecharge: any = [
  {
    icon: <AttachMoneyIcon />,
    dataIndex: 'TotalRevenueOrderCard'
  }
];
const totalBillOfCard: any = [
  {
    icon: <SyncAltIcon />,
    dataIndex: 'TotalOrderCard'
  }
];

//III. Thành phần doanh thu
const totalRevenue: any = [
  {
    icon: <AttachMoneyIcon />,
    dataIndex: 'TotalRevenue'
  }
];
const totalBill: any = [
  {
    icon: <WindowIcon />,
    dataIndex: 'TotalOrder'
  }
];
const averageBill: any = [
  {
    icon: <WindowIcon />,
    dataIndex: 'AvgRevenueOrder'
  }
];
const averageProduct: any = [
  {
    icon: <WindowIcon />,
    dataIndex: 'AvgProductOrder'
  }
];

const atStore: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'TotalRevenueAtStore'
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'hóa đơn',
    dataIndex: 'TotalOrderAtStore'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: ''
  },
  {
    title: 'TB sản phẩm',
    unit: 'Sản phẩm/Hóa đơn',
    dataIndex: 'AvgProductOrderAtStore'
  }
];
const takeAway: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'TotalRevenueTakeAway'
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'hóa đơn',
    dataIndex: 'TotalOrderTakeAway'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: ''
  },
  {
    title: 'TB sản phẩm',
    unit: 'Sản phẩm/Hóa đơn',
    dataIndex: 'AvgProductOrderTakeAway'
  }
];
const delivery: any = [
  {
    title: 'Doanh thu',
    unit: 'VNĐ',
    dataIndex: 'TotalRevenueDelivery'
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'hóa đơn',
    dataIndex: 'TotalOrderDelivery'
  },
  {
    title: 'TB hóa đơn',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: ''
  },
  {
    title: 'TB sản phẩm',
    unit: 'Sản phẩm/Hóa đơn',
    dataIndex: 'AvgProductOrderDelivery'
  }
];
const cancel: any = [
  {
    title: 'Tổng giá trị',
    unit: 'VNĐ',
    dataIndex: 'TotalRevenuePrecancel'
  },
  {
    title: 'Tổng hóa đơn',
    unit: 'hóa đơn',
    dataIndex: 'TotalOrderPreCancel'
  },
  {
    title: 'Hủy Trước Chế Biến',
    unit: 'VNĐ/Hóa đơn',
    dataIndex: ''
  },
  {
    title: 'Hủy Sau Chế Biến',
    unit: 'Sản phẩm/Hóa đơn',
    dataIndex: 'TotalOrderAfterCancel'
  }
];

// IV. Thanh Toán & Thu Ngân
const totalPayment: any = [
  {
    icon: <MoneyIcon />,
    dataIndex: 'TotalPayment'
  },
  {
    title: 'Tiền mặt [bán hàng] (1)',
    dataIndex: 'TotalPaymentForSales',
    highlight: true
  },
  {
    title: 'Tiền mặt [nạp thẻ] (2)',
    dataIndex: 'TotalPaymentCard'
  },
  {
    title: 'Thẻ thành viên (3)',
    dataIndex: 'TotalPaymentBuyCard',
    highlight: true
  },
  {
    title: 'Ví điện tử (4)',
    dataIndex: 'null'
  },
  {
    title: 'Momo:',
    dataIndex: 'TotalPaymentE_Wallet_Momo',
    fontSize: 'small'
  },
  {
    title: 'Grab Pay',
    dataIndex: 'TotalPaymentE_Wallet_GrabPay',
    fontSize: 'small'
  },
  {
    title: 'Grab Food',
    dataIndex: 'TotalPaymentE_Wallet_GrabFood',
    fontSize: 'small'
  },
  {
    title: 'VN Pay',
    dataIndex: 'TotalPaymentE_Wallet_VNPay',
    fontSize: 'small'
  },
  {
    title: 'Baemin',
    dataIndex: 'TotalPaymentE_Wallet_Baemin',
    fontSize: 'small'
  },
  {
    title: 'Shopee pay',
    dataIndex: 'TotalPaymentE_Wallet_Shopeepay',
    fontSize: 'small'
  },
  {
    title: 'Zalo pay',
    dataIndex: 'TotalPaymentE_Wallet_ZaloPay',
    fontSize: 'small'
  },
  {
    icon: <AttachMoneyIcon />,
    dataIndex: 'TotalPaymentE_Wallet'
  },
  {
    title: 'Ngân hàng (5)',
    dataIndex: 'TotalPaymentBank',
    highlight: true
  },
  {
    title: 'Thanh toán khác (6)',
    dataIndex: 'TotalPaymentOther'
  }
];
const totalAmountPayment: any = [
  {
    icon: <SyncAltIcon />,
    dataIndex: 'TotalTransactionPayment'
  },
  {
    title: 'Tiền mặt [bán hàng] (1)',
    dataIndex: 'TotalTransactionPaymentForSales',
    highlight: true
  },
  {
    title: 'Tiền mặt [nạp thẻ] (2)',
    dataIndex: 'TotalTransactionPaymentCard'
  },
  {
    title: 'Thẻ thành viên (3)',
    dataIndex: 'TotalTransactionPaymentBuyCard',
    highlight: true
  },
  {
    title: 'Ví điện tử (4)',
    dataIndex: 'null'
  },
  {
    title: 'Momo:',
    dataIndex: 'TotalTransactionPaymentE_Wallet_Momo',
    fontSize: 'small'
  },
  {
    title: 'Grab Pay',
    dataIndex: 'TotalTransactionPaymentE_Wallet_GrabPay',
    fontSize: 'small'
  },
  {
    title: 'Grab Food',
    dataIndex: 'TotalTransactionPaymentE_Wallet_GrabFood',
    fontSize: 'small'
  },
  {
    title: 'VN Pay',
    dataIndex: 'TotalTransactionPaymentE_Wallet_VNPay',
    fontSize: 'small'
  },
  {
    title: 'Baemin',
    dataIndex: 'TotalTransactionPaymentE_Wallet_Baemin',
    fontSize: 'small'
  },
  {
    title: 'Shopee pay',
    dataIndex: 'TotalTransactionPaymentE_Wallet_Shopeepay',
    fontSize: 'small'
  },
  {
    title: 'Zalo pay',
    dataIndex: 'TotalTransactionPaymentE_Wallet_ZaloPay',
    fontSize: 'small'
  },
  {
    icon: <TimelineIcon />,
    dataIndex: 'TotalPaymentE_Wallet'
  },
  {
    title: 'Ngân hàng (5)',
    dataIndex: 'TotalPaymentBank',
    highlight: true
  },
  {
    title: 'Thanh toán khác (6)',
    dataIndex: 'TotalPaymentOther'
  }
];

const config = {
  totalSalesRevenue,
  totalSalesInvoice,
  TotalRevenueCardRecharge,
  totalBillOfCard,
  totalRevenue,
  totalBill,
  averageBill,
  averageProduct,
  atStore,
  takeAway,
  delivery,
  cancel,
  totalPayment,
  totalAmountPayment
};

export default config;
