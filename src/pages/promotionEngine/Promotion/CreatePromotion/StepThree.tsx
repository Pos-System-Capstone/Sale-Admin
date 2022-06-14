import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card } from '../components/Card';

function StepThree() {
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h4">PREVIEW</Typography>
      <Card sx={{ p: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <StyleWidthTypography marginTop="0" width="40%" variant="h6">
            Name:
          </StyleWidthTypography>
          <StyleWidthTypography marginTop="0" variant="body1">
            Test Admin Account 1
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
                <StyleWidthTypography variant="h6">Start Date:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">19/05/2022 - 00:00</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">End Date:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">28/05/2022 - 00:00</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Exclusive:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">None</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Status:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Draft</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Payment methods:</StyleWidthTypography>
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
                <StyleWidthTypography variant="h6">Sale mode:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Delivery</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Apply by:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Online</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Available on holiday:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Yes</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Customer type:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Guest</StyleWidthTypography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <StyleWidthTypography variant="h6">Customer gender:</StyleWidthTypography>
                <StyleWidthTypography variant="body1">Male</StyleWidthTypography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: '32px' }}>
          <Button sx={{ p: '10px 16px' }} size="large" variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Box>
      </Card>
    </Paper>
  );
}

export default StepThree;
