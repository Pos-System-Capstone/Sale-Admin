import { Box, Grid, MenuItem, Stack, Switch, Typography } from '@mui/material';
import {
  CheckBoxField,
  DraftEditorField,
  InputField,
  RadioGroupField,
  SelectField
} from 'components/form';
import DateTimePickerField from 'components/form/DateTimePickerField';
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

  const [timeFrameChecked, setTimeFrameChecked] = useState(false);
  const handleTimeFrameChecked = () => {
    setTimeFrameChecked((prev) => !prev);
  };
  const particularDays = particularDayList();

  const [particularDay, setParticularDay] = useState(false);
  const handleParticularDay = () => {
    setParticularDay((prev) => !prev);
  };

  const { translate } = useLocales();
  return (
    <Stack p={1} spacing={3}>
      {/* <Card id="promotion-create">
        <Typography px={2} variant="h3" textAlign="left" sx={{ textTransform: 'uppercase' }}>
          {translate('promotionSystem.promotion.createPromotion.promotionType')}
        </Typography>
      </Card> */}
      <Typography px={2} variant="h3" textAlign="left" sx={{ textTransform: 'uppercase' }}>
        {translate('promotionSystem.promotion.createPromotion.promotionType')}
      </Typography>
      <Card>
        <Stack spacing={4} px={2} py={1} textAlign="left" direction="row">
          <FormBox
            title={`${translate(
              'promotionSystem.promotion.createPromotion.questionPromotionType'
            )}`}
          >
            <Stack spacing={2} direction="column" width={'100%'}>
              <RadioGroupField
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                fullWidth
                options={promotionType}
                name="promotion-type"
                defaultValue="usingVoucher"
              />
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    size="small"
                    name="promotionName"
                    label={`${translate(
                      'promotionSystem.promotion.createPromotion.promotionName'
                    )}`}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    size="small"
                    name="promotionCode"
                    // promotionType[1] must be a automatic mode
                    disabled={type === 2}
                    label={`${translate(
                      'promotionSystem.promotion.createPromotion.promotionCode'
                    )}`}
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Stack>
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.createPromotion.questionActionType')}`}
          >
            <Stack spacing={2} direction="column" width={'100%'}>
              <RadioGroupField
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                fullWidth
                options={kindAction}
                name="promotion-action"
                defaultValue="discount"
              />

              {alignment === 0 && (
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
              )}

              {alignment === 1 && (
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
              )}
            </Stack>
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={3} px={2} py={1}>
          <FormBox title={`${translate('promotionSystem.promotion.createPromotion.timeFrame')}`}>
            {/* <DateRangePickerField name="dateRangePicker" /> */}
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Stack direction={'row'} spacing={2}>
                <DateTimePickerField
                  fullWidth
                  name="start-date-time"
                  label="Start"
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                />
                <DateTimePickerField
                  fullWidth
                  name="end-date-time"
                  label="End"
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                />
              </Stack>

              <Stack direction={'row'} alignItems={'center'}>
                <CheckBoxField
                  name="unlimited"
                  label={`${translate('promotionSystem.promotion.createPromotion.unlimited')}`}
                />
              </Stack>
            </Stack>
          </FormBox>

          <Box>
            <Typography>
              {`${translate('promotionSystem.promotion.createPromotion.validInThisTimeFrameOnly')}`}
              <Switch checked={timeFrameChecked} onChange={handleTimeFrameChecked} />
            </Typography>
            {timeFrameChecked && (
              <Grid container spacing={2} width={'100%'} py={1}>
                {timeFrameList?.map((timeFrame, index) => (
                  <Grid xs={3} md={2} item key={index}>
                    <CheckBoxField name={timeFrame} label={timeFrame} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          <Box>
            <Typography>
              {`${translate('promotionSystem.promotion.createPromotion.validOnParticularDayOnly')}`}
              <Switch checked={particularDay} onChange={handleParticularDay} />
            </Typography>
            {particularDay && (
              <Grid container spacing={2} columns={7} width={'100%'} py={1}>
                {particularDays?.map((item, index) => (
                  <Grid xs={3} md={1} item key={index}>
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
