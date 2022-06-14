import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { AutoCompleteField, InputField } from 'components/form';
// import { InputField, AutoCompleteField } from 'components/form';
import React, { useState } from 'react';

interface Props {}

const BasicProductInfoForm = (props: Props) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const [alignment, setAlignment] = useState('discount');
  const StyledToggleButton = styled(ToggleButton)({
    width: '50%',
    height: '55.8px',
    paddingRight: '10px',
    pb: '20px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#00AB55'
    }
  });

  return (
    <Grid container flexWrap="nowrap" gap={2}>
      <Grid item xs={6}>
        <Stack spacing={2} direction="column">
          <Box>
            <InputField
              fullWidth
              name="product_name"
              label="Group Name"
              required
              sx={{ height: '30px', pb: '50px' }}
            />
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutoCompleteField
                  name="tags"
                  label="Quanitity"
                  required
                  multiple
                  freeSolo
                  variant="outlined"
                  options={[]}
                  limitTags={2}
                  fullWidth
                  sx={{ height: '30px', pb: '70px' }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  fullWidth
                  type="number"
                  name="price"
                  label="Length"
                  required
                  helperText="Maximum quantity of voucher: 62"
                  sx={{ height: '30px', pb: '70px' }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <Box>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              sx={{ display: 'flex' }}
            >
              <StyledToggleButton value="discount">Discount Action</StyledToggleButton>
              <StyledToggleButton value="gift">Gift Action</StyledToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            {alignment !== 'gift' && (
              <Box sx={{ height: '55.8px', pt: '10px' }}>
                <FormControl fullWidth disabled={alignment === 'gift'}>
                  <InputLabel id="demo-simple-select-label">Discount action</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Discount action"
                    sx={{ mb: '10px' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Giảm 5k cho phí ship</MenuItem>
                    <MenuItem value={10}>Action. tests</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            {alignment === 'gift' && (
              <Box sx={{ height: '55.8px', pt: '10px' }}>
                <FormControl fullWidth disabled={alignment !== 'gift'}>
                  <InputLabel id="demo-simple-select-label">Gift action</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gift action"
                    sx={{ mb: '10px' }}
                  >
                    <MenuItem value="">
                      <em>No data</em>
                    </MenuItem>
                    <MenuItem value={10}></MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicProductInfoForm;
