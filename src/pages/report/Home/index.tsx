// material
import { FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
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
import NetSale from './components/NetSale';
import TotalSaleCard from './components/TotalSaleCard';

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

  return (
    <Page title="Home">
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
          <TotalSaleCard displayName={user?.displayName} />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h4">Business insights</Typography>
            <Typography variant="body2">
              Based on data on {today.getDate()}/{today.getMonth() + 1}
            </Typography>
          </Box>
          <Box textAlign={'right'}>
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
        </Grid>

        <Grid item xs={12} md={4}>
          <NetSale />
        </Grid>

        {/* <Grid item xs={12} md={4}>
          <AppTotalActiveUsers />
        </Grid>

        <Grid item xs={12} md={4}>
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
      </Grid>
    </Page>
  );
}
