import { MenuItem, Stack, Typography } from '@mui/material';
import { CheckBoxField, RadioGroupField, SelectField } from 'components/form';
import CheckGroupBoxField from 'components/form/CheckGroupBoxField';
// import CheckGroupBoxField from 'components/form/CheckGroupBoxField';
import useLocales from 'hooks/useLocales';
import { useFormContext } from 'react-hook-form';
// import { Controller } from 'react-hook-form';
import { Card } from '../components/Card';
import {
  applyByList,
  exclusiveList,
  genderList,
  memberLevelList,
  paymentMethodList,
  saleModeList,
  targetCustomerList
} from '../components/config';
import FormBox from '../components/FormBox';

export default function StepTwo({ watch }: any) {
  const { translate } = useLocales();

  const targetCustomer = targetCustomerList();
  const paymentMethod = paymentMethodList();
  const gender = genderList();
  const saleMode = saleModeList();
  const applyBy = applyByList();
  const memberLevel = memberLevelList();
  const exclusives = exclusiveList();
  const { control } = useFormContext();

  const [isMember] = watch(['membership']);
  console.log(watch('checkArr'));

  return (
    <Stack p={1} spacing={3} width="100%">
      <Typography px={2} variant="h3" sx={{ textTransform: 'uppercase' }} textAlign={'left'}>
        {translate('promotionSystem.promotion.settings.constraint')}
      </Typography>
      <Card>
        <Stack spacing={4} p={2} textAlign="left">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.paymentMethod')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperPaymentMethod')}`}
          >
            <CheckGroupBoxField name={'checkArr'} arr={paymentMethod} control={control} />
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack
          spacing={4}
          px={2}
          textAlign="left"
          display={'flex'}
          direction="row"
          alignItems={'stretch'}
        >
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.targetCustomer')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperTargetCustomer')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {targetCustomer?.map((item) => (
              <CheckBoxField key={item.value} name={item.value} label={item.label} />
            ))}
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.memberShipLevel')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperMemberShipLevel')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            <SelectField
              disabled={!isMember}
              name="membership level"
              label={`${translate('promotionSystem.promotion.select')}`}
              fullWidth
              multiple
            >
              {memberLevel?.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectField>
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.customerGender')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperCustomerGender')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {gender.map((item) => (
              <CheckBoxField key={item.value} name={item.value} label={item.label} />
            ))}
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={4} px={2} textAlign="left" direction="row">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.saleMode')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperSaleMode')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {saleMode.map((item) => (
              <CheckBoxField key={item.value} name={item.value} label={item.label} />
            ))}
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.applyBy')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperApplyBy')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {applyBy.map((item) => (
              <CheckBoxField key={item.value} name={item.value} label={item.label} />
            ))}
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.exclusive')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperExclusive')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            <RadioGroupField
              sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
              fullWidth
              name="exclusive"
              defaultValue="none"
              options={exclusives}
            />
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={4} px={2} textAlign="left">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.storeConfig')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperStoreConfig')}`}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
