// material
import { Card, CardProps, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// material
import { Box } from '@mui/material';
import Page from 'components/Page';
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
const TOTAL_SOLD = {
  netSales: 0,
  totalOrders: 0,
  lastUpdatedTime: null
};

export default function TotalSaleCard({ displayName }: AppWelcomeProps) {
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
              Last updated: {TOTAL_SOLD.lastUpdatedTime}
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
                    {formatCurrency(TOTAL_SOLD.netSales)}
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
                    {formatCurrency(TOTAL_SOLD.totalOrders)}
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
