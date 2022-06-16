import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';
import { Card } from '../components/Card';

function StepThree() {
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));
  const { translate } = useLocales();
  return (
    <Stack p={1} spacing={3} sx={{ width: '100%' }}>
      <Typography px={2} variant="h3" sx={{ textTransform: 'uppercase' }}>
        {translate('promotionSystem.promotion.preview.title')}
      </Typography>
      <Card>
        <Stack spacing={4} p={2} textAlign="left">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <StyleWidthTypography marginTop="0" width="40%" variant="h6">
              {translate('promotionSystem.promotion.preview.name')}
            </StyleWidthTypography>
            <StyleWidthTypography marginTop="0" variant="body1">
              Test promotion name
            </StyleWidthTypography>
          </Box>
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.startDate')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">19/05/2022 - 00:00</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.endDate')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">28/05/2022 - 00:00</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.exclusive')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">None</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.status')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Draft</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.paymentMethod')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Cash</StyleWidthTypography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.saleMode')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Delivery</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.applyBy')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Online</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.availableOnHoliday')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Yes</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.customerType')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Guest</StyleWidthTypography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.customerGender')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Male</StyleWidthTypography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={4.5}>
            <Button sx={{ p: '10px 16px' }} size="large" variant="contained" component="label">
              {translate('promotionSystem.promotion.preview.uploadFile')}
              <input type="file" hidden />
            </Button>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}

export default StepThree;
