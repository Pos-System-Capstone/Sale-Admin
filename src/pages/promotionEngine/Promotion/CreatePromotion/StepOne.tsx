import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { CheckBoxField, DraftEditorField, SelectField } from 'components/form';
import DateRangePickerField from 'components/form/DateRangePickerField';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Card, CardTitle } from '../components/Card';
import {
  discountActionList,
  giftActionList,
  kindActionList,
  particularDayList,
  promotionTypeList,
  timeFrameList
} from '../components/config';
import FormBox from '../components/FormBox';
import ToggleButton from '../components/ToggleButton';

export default function StepOne() {
  const [type, setType] = useState(promotionTypeList[0]);
  const handleChange1 = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };
  // what kind of action
  const [alignment, setAlignment] = useState(kindActionList[0]);
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const [timeframeChecked, setTimeframeChecked] = useState(false);
  const handleTimeframChecked = () => {
    setTimeframeChecked((prev) => !prev);
  };
  const [particularDay, setParticularDay] = useState(false);
  const handleParticularDay = () => {
    setParticularDay((prev) => !prev);
  };

  return (
    <Stack p={1} spacing={3}>
      <Card id="product-detail">
        <Stack spacing={4} sx={{ width: '65%' }}>
          <Typography variant="h4" textAlign="center">
            PROMOTION TYPE
          </Typography>
          <FormBox title="What type of promotion ?">
            <Stack spacing={2} direction="column">
              <ToggleButtonGroup sx={{ gap: 2 }} value={type} exclusive onChange={handleChange1}>
                {promotionTypeList.map((promotionType, index) => (
                  <ToggleButton sx={{ flex: 1 }} key={index} value={promotionType}>
                    {promotionType}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Stack spacing={2} direction="row">
                <TextField size="small" fullWidth required label="Promotion Name" color="primary" />
                <TextField
                  size="small"
                  fullWidth
                  required
                  disabled={type === 'Automatic'}
                  label="Code"
                  color="primary"
                />
              </Stack>
            </Stack>
          </FormBox>
          <FormBox title="What kind of action ?">
            <Stack spacing={2} direction="column">
              <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
                {kindActionList.map((kindAction, index) => (
                  <ToggleButton sx={{ flex: 1 }} key={index} value={kindAction}>
                    {kindAction}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {alignment === 'Discount' && (
                <Box>
                  {/* <Typography my={2} variant="subtitle1">
                            Discount Action
                          </Typography>
                          <ToggleButtonGroup value={action1} exclusive onChange={handleChange2}>
                            {discountActionList.map((action, index) => (
                              <ToggleButton key={index} value={action}>
                                {action}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup> */}
                  <SelectField
                    fullWidth
                    label="Discount Action"
                    name="discountAction"
                    options={discountActionList}
                  >
                    {discountActionList.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Box>
              )}
              {alignment === 'Gift' && (
                <Box>
                  {/* <Typography my={2} variant="subtitle1">
                            Gift Action
                          </Typography>
                          <ToggleButtonGroup value={action1} exclusive onChange={handleChange2}>
                            {giftActionList.map((action, index) => (
                              <ToggleButton key={index} value={action}>
                                {action}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup> */}
                  <SelectField
                    fullWidth
                    label="Gift  Action"
                    name="giftAction"
                    options={giftActionList}
                  >
                    {giftActionList.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Box>
              )}
            </Stack>
          </FormBox>
          <FormBox title="Time Frame">
            <Box>
              <DateRangePickerField name="dateRangePicker" />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Checkbox />
                <Typography>Unlimited Date</Typography>
              </Box>
            </Box>
          </FormBox>
        </Stack>
        <Stack spacing={1}>
          <Box sx={{ paddingLeft: '8px' }}>
            <Typography>
              Valid in this timeframe only
              <Switch checked={timeframeChecked} onChange={handleTimeframChecked} />
            </Typography>
            {timeframeChecked && (
              <Grid container spacing={2}>
                {timeFrameList.map((timeFrame, index) => (
                  <Grid xs={2} item key={index}>
                    <CheckBoxField name={timeFrame} label={timeFrame} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          <Box sx={{ paddingLeft: '8px' }}>
            <Typography>
              Valid on particular days only
              <Switch checked={particularDay} onChange={handleParticularDay} />
            </Typography>
            {particularDay && (
              <Grid container spacing={2} columns={7}>
                {particularDayList.map((item, index) => (
                  <Grid xs={1} item key={index}>
                    <CheckBoxField name={item} label={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Stack>
      </Card>

      <Card>
        <CardTitle mb={2} variant="subtitle1">
          Description
        </CardTitle>
        <Controller
          name="description"
          render={({ field }) => <DraftEditorField value={field.value} onChange={field.onChange} />}
        />
      </Card>
    </Stack>
  );
}
