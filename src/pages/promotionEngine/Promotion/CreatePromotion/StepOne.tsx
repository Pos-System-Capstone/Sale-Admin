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
import useLocales from 'hooks/useLocales';
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
  const giftAction = giftActionList();
  const discountAction = discountActionList();
  const promotionType = promotionTypeList();

  // what kind of action
  const kindAction = kindActionList();
  const [type, setType] = useState(0);
  const handleChange1 = (event: React.MouseEvent<HTMLElement>, newAlignment: number) => {
    if (newAlignment !== null) {
      setType(newAlignment);
    }
  };

  const [alignment, setAlignment] = useState(0);
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: number) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [timeframeChecked, setTimeframeChecked] = useState(false);
  const handleTimeframChecked = () => {
    setTimeframeChecked((prev) => !prev);
  };
  const particularDays = particularDayList();

  const [particularDay, setParticularDay] = useState(false);
  const handleParticularDay = () => {
    setParticularDay((prev) => !prev);
  };

  const { translate } = useLocales();

  return (
    <Stack p={1} spacing={3}>
      <Card id="product-detail">
        <Stack spacing={4} sx={{ width: '80%' }}>
          <Typography variant="h4" textAlign="left">
            {translate('promotionSystem.promotion.createPromotion.promotionType')}
          </Typography>
          <FormBox
            title={`${translate(
              'promotionSystem.promotion.createPromotion.questionPromotionType'
            )}`}
          >
            <Stack spacing={2} direction="column">
              <ToggleButtonGroup sx={{ gap: 2 }} value={type} exclusive onChange={handleChange1}>
                {promotionType.map((item, index) => (
                  <ToggleButton sx={{ flex: 1 }} key={index} value={index}>
                    {item}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Stack spacing={2} direction="row">
                <TextField
                  size="medium"
                  fullWidth
                  required
                  label={`${translate('promotionSystem.promotion.createPromotion.promotionName')}`}
                  color="primary"
                />
                <TextField
                  size="medium"
                  fullWidth
                  required
                  // promotionType[2] must be a automatic mode
                  disabled={type === 2}
                  label={`${translate('promotionSystem.promotion.createPromotion.promotionCode')}`}
                  color="primary"
                />
              </Stack>
            </Stack>
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.createPromotion.questionActionType')}`}
          >
            <Stack spacing={2} direction="column">
              <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
                {kindAction.map((kindAction, index) => (
                  <ToggleButton sx={{ flex: 1 }} key={index} value={index}>
                    {kindAction}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {alignment === 0 && (
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
                    label={`${translate('promotionSystem.promotion.createPromotion.discount')}`}
                    name="discountAction"
                    // options={discountAction}
                  >
                    {discountAction?.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Box>
              )}
              {alignment === 1 && (
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
                    label={`${translate('promotionSystem.promotion.createPromotion.gift')}`}
                    name="giftAction"
                    // options={giftAction}
                  >
                    {giftAction?.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Box>
              )}
            </Stack>
          </FormBox>
          <FormBox title={`${translate('promotionSystem.promotion.createPromotion.timeFrame')}`}>
            <Box>
              <DateRangePickerField name="dateRangePicker" />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Checkbox />
                <Typography>{`${translate(
                  'promotionSystem.promotion.createPromotion.unlimited'
                )}`}</Typography>
              </Box>
            </Box>
          </FormBox>
        </Stack>
        <Stack spacing={1}>
          <Box sx={{ paddingLeft: '8px' }}>
            <Typography>
              {`${translate('promotionSystem.promotion.createPromotion.validInThisTimeFrameOnly')}`}
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
              {`${translate('promotionSystem.promotion.createPromotion.validOnParticularDayOnly')}`}
              <Switch checked={particularDay} onChange={handleParticularDay} />
            </Typography>
            {particularDay && (
              <Grid container spacing={2} columns={7}>
                {particularDays.map((item, index) => (
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
          {`${translate('promotionSystem.promotion.description')}`}
        </CardTitle>
        <Controller
          name="description"
          render={({ field }) => <DraftEditorField value={field.value} onChange={field.onChange} />}
        />
      </Card>
    </Stack>
  );
}
