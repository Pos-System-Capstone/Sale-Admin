import {
  Alert,
  AlertTitle,
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import { CheckBoxField } from 'components/form';
import React from 'react';
import { useState } from 'react';
import { CardTitle } from '../Card';
interface Props {
  hasVariant: any;
}

const SubMiddleForm: React.FC<Props> = ({ hasVariant }) => {
  const [count, setCount] = useState(0);
  return (
    <Card id="variants">
      <CheckBoxField name="hasVariant" label="Advanced settings" />
      {hasVariant && (
        <Box sx={{ width: '100%' }}>
          <CardTitle variant="subtitle1">Advanced settings</CardTitle>
          <Stack sx={{ width: '100%', pb: '25px', pt: '20px' }} spacing={1}>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>A voucher is a bond of the redeemable transaction type
              which is worth a certain monetary value and which may be spent only for specific
              reasons or on specific goods.
            </Alert>
          </Stack>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Charset</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Charset"
                  >
                    <MenuItem value={10}>Alphanumeric</MenuItem>
                    <MenuItem value={10}>Alphabetic</MenuItem>
                    <MenuItem value={10}>Alphabetic Lowercase</MenuItem>
                    <MenuItem value={10}>Alphabetic Uppercase</MenuItem>
                    <MenuItem value={10}>Numbers</MenuItem>
                    <MenuItem value={10}>Custom</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%'
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  id="outlined-disabled"
                  label="Sample"
                  defaultValue="Hello World"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%'
                }}
              >
                <TextField
                  fullWidth
                  label="Prefix"
                  id="fullWidth"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  helperText={`${count}/10`}
                  onChange={(e) => setCount(e.target.value.length)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%'
                }}
              >
                <TextField
                  fullWidth
                  label="Postfix"
                  id="fullWidth"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  helperText={`${count}/10`}
                  onChange={(e) => setCount(e.target.value.length)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Card>
  );
};

export default SubMiddleForm;