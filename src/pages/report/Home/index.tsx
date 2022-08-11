// material
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
import useSettings from 'hooks/useSettings';
// components
import { DateRange, DateRangePicker } from '@mui/lab';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/system';
import Page from 'components/Page';
import moment from 'moment';
import { useState } from 'react';
import allHomeData from './components/config';
import KeyTrends from './components/KeyTrendsCard';
import NetSale from './components/NetSale';
import TopPerformingStore from './components/TopPerformingStore';
import TotalSaleCard from './components/TotalSaleCard';
import TransactionChart from './components/TransactionChart';
import TopSellingItem from './components/TopSellingItem';
import TopCustomerFeedback from './components/TopCustomerFeedback';

// ----------------------------------------------------------------------

export default function HomeReport() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  const [store, setStore] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value as string);
  };

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate(),
    yesterday
  ]);
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(true);

  const trends = {
    total_transaction: '00:18:45',
    gross_sales: '1.31396e+08',
    net_sales: '1.31396e+08',
    average_transaction_amount: '118695.5736',
    total_customers: '827'
  };

  return (
    <Page title="Home">
      <Stack direction={'column'} spacing={3}>
        <FormControl sx={{ width: '250px' }}>
          <InputLabel id="Store">Store</InputLabel>
          <Select labelId="Store" id="Store" value={store} label="Store" onChange={handleChange}>
            <MenuItem value={10}>HCM.PA.SH.15FNTMK</MenuItem>
            <MenuItem value={20}>HCM.PA.SH.53CND</MenuItem>
            <MenuItem value={30}>HCM.GF.SH.102HVB</MenuItem>
            <MenuItem value={30}>HCM.PA.SH.47TCV</MenuItem>
            <MenuItem value={30}>HCM.PA.SH.97LVD</MenuItem>
          </Select>
        </FormControl>

        <TotalSaleCard />

        <Stack direction={'row'} sx={{ flexWrap: 'nowrap', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4">Business insights</Typography>
            <Typography variant="body2">
              Based on data on {today.getDate()}/{today.getMonth() + 1}
            </Typography>
          </Box>
          <Box>
            <DateRangePicker
              inputFormat="dd/MM/yyyy"
              minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
              // disabled={loading}
              disableCloseOnSelect
              disableFuture
              value={dateRange}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} label="Từ" />
                  <Box sx={{ mx: 2 }}> - </Box>
                  <TextField {...endProps} label="Đến" />
                </>
              )}
              onChange={(e) => {
                if (e[0] && e[1]) {
                  setDateRange(e);
                }
              }}
              onOpen={() => setDone(false)}
              onClose={() => setDone(true)}
              key="date-range"
            />
          </Box>
        </Stack>

        <Box>
          <Grid container item spacing={2}>
            <Grid item container md={8} spacing={2}>
              <Grid item xs={12} md={'auto'}>
                <NetSale />
              </Grid>
              <Grid item xs={12} md={12}>
                <TransactionChart />
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid item xs={12} md={12} height={'100%'}>
                <KeyTrends data={trends!} column={allHomeData.trends} bc="white" bch="grey.300" />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={4}>
              <TopPerformingStore />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopSellingItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <TopCustomerFeedback />
            </Grid>
          </Grid>
        </Box>

        {/* <Grid item xs={12} md={4}>
          <AppTotalInstalled />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppTotalDownloads />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppAreaInstalled />
        </Grid>

        <Grid item xs={12} lg={8}>
          <AppNewInvoice />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopRelated />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopInstalledCountries />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppTopAuthors />
        </Grid> */}
      </Stack>
    </Page>
  );
}
