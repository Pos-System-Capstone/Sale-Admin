// material
import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// material
import { Box } from '@mui/material';
import Page from 'components/Page';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
import { fToNowVN } from 'utils/formatTime';
// ----------------------------------------------------------------------

export default function TotalSaleCard({ data }: any) {
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: '#28C76F',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }));
  return (
    <RootStyle>
      <Page sx={{ marginTop: '-20px' }}>
        <Grid container sx={{ marginBottom: '10px' }}>
          <Grid item md={6}>
            <Typography
              variant="h6"
              sx={{ maxWidth: 480, mx: 'auto', height: 50, color: '#FFFFFF', marginTop: '20px' }}
            >
              Sơ lược về doanh nghiêp
              <br />
              Cập nhật mới nhất: {data?.lastUpdatedTime && fToNowVN(data?.lastUpdatedTime)}
            </Typography>
          </Grid>

          <Grid
            container
            item
            md={6}
            spacing={2}
            height={'100%'}
            sx={{ display: 'flex' }}
            flexWrap="wrap"
          >
            <Grid item md={6} sx={{ flexWrap: 'nowrap' }}>
              <Card sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" paragraph>
                    Doanh thu thuần hôm nay:
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {formatCurrency(data?.netSales)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" paragraph>
                    Số lượng giao dịch hôm nay:
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {fNumber(data?.totalOrders)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </RootStyle>
  );
}
