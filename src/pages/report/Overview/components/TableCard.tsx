import { Box, Card, Typography } from '@mui/material';
import { fNumber, fShortenNumber } from 'utils/formatNumber';

type FakeData = {
  [key: string]: number;
};
export const fakeDataPayment: FakeData = {
  TotalPayment: 262920224,
  TotalTransactionPayment: 6413,
  TotalPaymentForSales: 201344834,
  TotalTransactionExchangeCash: 0,
  TotalTransactionPaymentForSales: 5049,
  TotalPaymentCard: 6980000,
  TotalTransactionPaymentCard: 40,
  TotalPaymentE_Wallet: 44645540,
  TotalTransactionPaymentE_Wallet: 1050,
  TotalTransactionPaymentE_Wallet_GrabPay: 9,
  TotalPaymentE_Wallet_GrabPay: 410000,
  TotalTransactionPaymentE_Wallet_GrabFood: 70,
  TotalTransactionPaymentE_Wallet_VnPay: 24,
  TotalPaymentE_Wallet_GrabFood: 6421080,
  TotalPaymentE_Wallet_VNPay: 1195800,
  TotalPaymentE_Wallet_Momo: 28833340,
  TotalPaymentE_Wallet_ZaloPay: 1623500,
  TotalTransactionPaymentE_Wallet_Momo: 775,
  TotalTransactionPaymentE_Wallet_ZaloPay: 36,
  TotalPaymentE_Wallet_Baemin: 2733800,
  TotalTransactionPaymentE_Wallet_Baemin: 39,
  TotalPaymentE_Wallet_Shopeepay: 3428020,
  TotalTransactionPaymentE_Wallet_Shopeepay: 97,
  TotalPaymentBank: 1320800,
  TotalTransactionPaymentBank: 26,
  TotalPaymentOther: 0,
  TotalTransactionPaymentOther: 0,
  TotalTransactionPaymentBuyCard: 248,
  TotalPaymentBuyCard: 8629050
};
export const fakeData: FakeData = {
  TotalRevenue: 255905824,
  TotalRevenueWithoutCard: 0,
  TotalRevenueWithDiscount: 284368014,
  TotalDiscount: 28462190,
  TotalDiscount100: 0,
  TotalRevenueWithoutDiscountAndCard: 255905824,
  TotalRevenueCard: 0,
  TotalRevenuePrecancel: 106000,
  TotalRevenueAftercancel: 0,
  TotalOrder: 6391,
  TotalOrderAtStore: 1893,
  TotalRevenueAtStore: 73774900,
  TotalRevenueAtStore2: 0,
  TotalOrderTakeAway: 4391,
  TotalRevenueTakeAway: 173785624,
  TotalOrderDelivery: 107,
  TotalRevenueDelivery: 8345300,
  TotalOrderCard: 40,
  TotalRevenueOrderCard: 6980000,
  TotalOrderPreCancel: 1,
  TotalOrderAfterCancel: 0,
  AvgRevenueOrder: 40041.593490846506,
  AvgRevenueOrderAtStore: 0,
  AvgRevenueOrderTakeAway: 0,
  AvgRevenueOrderDelivery: 0,
  AvgProductOrder: 1.48,
  AvgProductOrderTakeAway: 1.47,
  AvgProductOrderAtStore: 1.39,
  AvgProductOrderDelivery: 2.61
};

type Size = 'small' | 'medium';

type CardProps = {
  unit?: string;
  isCurrency?: boolean;
  fakeData?: any;
  data?: [];
  bc?: string;
  bch?: string;
  fontWeight?: string;
  titleHeader?: any;
  subtitleHeader?: any;
};

export const MiniTableCard = ({ data, fakeData, title, subtitle, bc, ...props }: any) => {
  return (
    <Card sx={{ backgroundColor: bc, color: 'grey.0' }}>
      <Box pb={1}>
        <Typography textAlign="left" variant="h6">
          {title}
        </Typography>
        <Typography textAlign="right" variant="body2">
          {subtitle}
        </Typography>
      </Box>
      {data?.map((item: any) => (
        <Typography key={item.dataIndex} textAlign="right" variant="h4">
          {fakeData[item.dataIndex] < 100
            ? fShortenNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])
            : fNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])}
        </Typography>
      ))}
    </Card>
  );
};

const TableCard: React.FC<CardProps> = ({
  data,
  fakeData,
  bc,
  bch,
  fontWeight = '400',
  titleHeader = 'A default title',
  subtitleHeader = 'A default subtitle',
  ...props
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: bc,
        color: 'grey.0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Typography variant="h4" align="center">
          {titleHeader}
        </Typography>
        <Typography variant="subtitle2" color="grey.800" align="center">
          {subtitleHeader}
        </Typography>
      </Box>

      {data?.map((item: any) => {
        const hItem = item.highlight ? bch : bc;
        const fz = item.fontSize === 'small' ? 'h6' : 'h4';
        return (
          <Box
            key={item}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              gap: 2,
              backgroundColor: hItem
            }}
          >
            {item.icon ? (
              <Typography sx={{ fontWeight }} variant="body2" component="div">
                {item.icon}
              </Typography>
            ) : (
              <Typography sx={{ fontWeight }} variant="body2" component="div">
                {item.title}
              </Typography>
            )}
            {item.dataIndex === 'null' ? (
              ''
            ) : (
              <Typography sx={{ fontWeight }} variant={fz} component="div">
                {fakeData[item.dataIndex] < 100
                  ? fShortenNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])
                  : fNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])}
              </Typography>
            )}
          </Box>
        );
      })}
    </Card>
  );
};

export const TableCardSmall: React.FC<CardProps> = ({
  unit,
  data,
  fakeData,
  bc,
  bch,
  fontWeight = '400',
  titleHeader = 'A default title',
  subtitleHeader = 'A default subtitle',
  ...props
}) => (
  <Card
    sx={{
      height: '100%',
      backgroundColor: bc,
      color: 'grey.0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <Box>
      <Typography variant="h4" align="center">
        {titleHeader}
      </Typography>
      <Typography variant="subtitle2" color="grey.800" align="center">
        {subtitleHeader}
      </Typography>
    </Box>

    {data?.map((item: any) => {
      const hItem = item.highlight ? bch : bc;
      const fz = item.fontSize === 'small' ? 'h6' : 'h4';
      return (
        <>
          <Box
            key={item}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 1,
              gap: 1,
              backgroundColor: hItem
            }}
          >
            <Box>
              {item.icon ? (
                <Typography sx={{ fontWeight }} variant="body2" component="div">
                  {item.icon}
                </Typography>
              ) : (
                <Typography sx={{ fontWeight }} variant="body2" component="div">
                  {item.title}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography sx={{ fontWeight }} variant="body2" component="div">
                {item.unit}
              </Typography>
            </Box>
          </Box>
          {item.dataIndex === 'null' ? (
            ''
          ) : (
            <Box display="flex" justifyContent="flex-end">
              <Typography sx={{ fontWeight }} variant={fz} component="div">
                {fakeData[item.dataIndex] < 100
                  ? fShortenNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])
                  : fNumber(fakeData[item.dataIndex] || fakeDataPayment[item.dataIndex])}
              </Typography>
            </Box>
          )}
        </>
      );
    })}
  </Card>
);

export default TableCard;
