// material
import { Card, CardProps, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// material
import { Box } from '@mui/material';
import Page from 'components/Page';
import { fToNow } from 'utils/formatTime';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function TotalSaleCard({ data }: any) {
  return (
    <RootStyle>
      <Page sx={{ marginTop: '-20px' }}>
        <Grid container sx={{ marginBottom: '10px' }}>
          <Grid item md={6}>
            <Typography
              variant="h6"
              sx={{ maxWidth: 480, mx: 'auto', height: 50, color: 'white', marginTop: '20px' }}
            >
              Your business at a glance
              <br />
              Last updated: {data?.lastUpdatedTime && fToNow(data.lastUpdatedTime)}
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
                    Net sales today:
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
                    Number of transactions today:
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
