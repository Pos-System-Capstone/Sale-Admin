import { Box, Paper, Typography } from '@mui/material';

type FakeData = {
  [key: string]: number;
};

export const fakeData: FakeData = {
  TotalRevenue: 4035840,
  TotalRevenueWithoutCard: 0,
  TotalRevenueWithDiscount: 4293000,
  TotalDiscount: 257160,
  TotalDiscount100: 25000,
  TotalRevenueWithoutDiscountAndCard: 4035840,
  TotalRevenueCard: 0,
  TotalRevenuePrecancel: 0,
  TotalRevenueAftercancel: 0,
  TotalOrder: 113,
  TotalOrderAtStore: 24,
  TotalRevenueAtStore: 734000,
  TotalRevenueAtStore2: 0,
  TotalOrderTakeAway: 86,
  TotalRevenueTakeAway: 3136840,
  TotalOrderDelivery: 3,
  TotalRevenueDelivery: 165000,
  TotalOrderCard: 1,
  TotalRevenueOrderCard: 500000,
  TotalOrderPreCancel: 0,
  TotalOrderAfterCancel: 0,
  AvgRevenueOrder: 35715.398230088496,
  AvgRevenueOrderAtStore: 0,
  AvgRevenueOrderTakeAway: 0,
  AvgRevenueOrderDelivery: 0,
  AvgProductOrder: 1.33,
  AvgProductOrderTakeAway: 1.31,
  AvgProductOrderAtStore: 1.21,
  AvgProductOrderDelivery: 2.33
};

type Size = 'small' | 'medium';

type CardProps = {
  fakeData?: any;
  data?: [];
  bc?: string;
  bch?: string;
  fontWeight?: string;
  titleHeader?: string;
  subtitleHeader?: string;
};

export const MiniTableCard = () => {
  return (
    <Paper sx={{ backgroundColor: 'red', color: 'grey.0' }}>
      <Box pb={2}>
        <Typography textAlign="left" variant="h6">
          Doanh Thu
        </Typography>
        <Typography textAlign="right" variant="body2">
          Đơn vị(VNĐ)
        </Typography>
      </Box>
      <Typography textAlign="right" variant="h4">
        7,995,100
      </Typography>
    </Paper>
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
    <Paper sx={{ backgroundColor: bc, color: 'grey.0' }}>
      <Typography variant="h4" align="center">
        {titleHeader}
      </Typography>
      <Typography variant="subtitle2" color="grey.800" align="center" pb={3}>
        {subtitleHeader}
      </Typography>

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
            <Typography sx={{ fontWeight }} variant="body2" component="div">
              {item.title}
            </Typography>
            <Typography sx={{ fontWeight }} variant={fz} component="div">
              {fakeData[item.dataIndex]?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND'
              })}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
};

export default TableCard;
