import { MenuItem, Stack, ToggleButtonGroup, Typography } from '@mui/material';
import { CheckBoxField, SelectField } from 'components/form';
import React, { useState } from 'react';
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
import ToggleButton from '../components/ToggleButton';

interface Props {
  isMember: boolean;
}

export default function StepTwo(props: Props) {
  const { isMember } = props;
  const [exclusive, setExclusive] = useState(exclusiveList[0]);
  const handleChangeExclusive = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setExclusive(newAlignment);
    }
  };
  return (
    <Stack p={1} spacing={3} width="100%">
      <Typography variant="h4">CONSTRAINTS</Typography>
      <Card>
        <Stack spacing={2} textAlign="left">
          <FormBox title="PAYMENT METHOD" subtitle="Payment method can use this promotion">
            {paymentMethodList.map((paymentMethod, index) => (
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
            title="TARGET CUSTOMER"
            subtitle="Kind of customer can use your promotion"
            sizeGrid={4}
          >
            {targetCustomerList.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
          <FormBox title="MEMBERSHIP LEVEL" subtitle="Level of customer" sizeGrid={4}>
            <SelectField
              disabled={!isMember}
              name="membership level"
              label="Select"
              fullWidth
              multiple
            >
              {memberLevelList.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </SelectField>
          </FormBox>
          <FormBox
            title="CUSTOMER GENDER"
            subtitle="Gender of customer can use your promotion"
            sizeGrid={4}
          >
            {genderList.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={4} textAlign="left" direction="row">
          <FormBox
            title="SALE MODE"
            subtitle="The mode in which you sell your products"
            sizeGrid={4}
          >
            {saleModeList.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
          <FormBox title="APPLY BY" subtitle="Where yours customers can use promotion" sizeGrid={4}>
            {applyByList.map((item, index) => (
              <CheckBoxField key={index} name={item} label={item} />
            ))}
          </FormBox>
          <FormBox
            title="EXCLUSIVE"
            subtitle="Whether promotion excludes others or not"
            sizeGrid={4}
          >
            <ToggleButtonGroup exclusive value={exclusive} onChange={handleChangeExclusive}>
              {exclusiveList.map((exclusive, index) => (
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
            title="STORES CONFIGURATION"
            subtitle="Stores that customer can use promotion"
          ></FormBox>
        </Stack>
      </Card>
    </Stack>
  );
}
