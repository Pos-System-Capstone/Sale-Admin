import { MenuItem, Stack, ToggleButtonGroup, Typography } from '@mui/material';
import { CheckBoxField, SelectField } from 'components/form';
import useLocales from 'hooks/useLocales';
import React, { useState } from 'react';
import { Card } from '../components/Card';
import {
  applyByList,
  exclusiveList,
  genderList,
  memberLevelList,
  paymentMethodList,
  saleModeList
} from '../components/config';
import FormBox from '../components/FormBox';
import ToggleButton from '../components/ToggleButton';

interface Props {
  isMember: boolean;
  targetCustomer: string[];
}

export default function StepTwo(props: Props) {
  const { translate } = useLocales();
  const { isMember, targetCustomer } = props;

  const paymentMethod = paymentMethodList();
  const gender = genderList();
  const saleMode = saleModeList();
  const applyBy = applyByList();
  const memberLevel = memberLevelList();
  const exclusives = exclusiveList();
  const [exclusive, setExclusive] = useState(exclusives[0]);
  const handleChangeExclusive = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setExclusive(newAlignment);
    }
  };

  // const mh = currentLang.value === 'vi' ? '44px' : 0;
  return (
    <Stack p={1} spacing={3} width="100%">
      <Card>
        <Stack spacing={4} textAlign="left">
          <Typography variant="h4">
            {translate('promotionSystem.promotion.settings.constraint')}
          </Typography>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.paymentMethod')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperPaymentMethod')}`}
          >
            {paymentMethod.map((paymentMethod, index) => (
              <CheckBoxField
                key={index}
                name={paymentMethod}
                label={paymentMethod}
                helperText="Please choose at least one payment"
              />
            ))}
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={4} textAlign="left" direction="row">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.targetCustomer')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperTargetCustomer')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {targetCustomer.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
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
              {memberLevel.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
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
            {gender.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={4} textAlign="left" direction="row">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.saleMode')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperSaleMode')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {saleMode.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.applyBy')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperApplyBy')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            {applyBy.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.exclusive')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperExclusive')}`}
            sizeGrid={4}
            minHeight="44px"
          >
            <ToggleButtonGroup exclusive value={exclusive} onChange={handleChangeExclusive}>
              {exclusives.map((exclusive, index) => (
                <ToggleButton size="small" key={index} value={exclusive}>
                  {exclusive}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={2} textAlign="left">
          <FormBox
            title={`${translate('promotionSystem.promotion.settings.storeConfig')}`}
            subtitle={`${translate('promotionSystem.promotion.settings.helperStoreConfig')}`}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
