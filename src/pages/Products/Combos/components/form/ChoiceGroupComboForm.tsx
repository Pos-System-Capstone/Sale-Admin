import trashIcon from '@iconify/icons-eva/trash-outline';
import closeIcon from '@iconify/icons-eva/close-outline';
import { Icon } from '@iconify/react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button
} from '@mui/material';
import { InputField } from 'components/form';
import Label from 'components/Label';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { TCollection } from 'types/collection';
import { CardTitle } from 'pages/Products/components/Card';
import ModalCollectionForm from '../ModalCollectionForm';
import { Add } from '@mui/icons-material';
import productInCollectionApi from 'api/collection';
import { differenceBy, unionBy } from 'lodash';
import { CombinationModeEnum } from 'types/product';

interface Props {}

const ChoiceGroupComboForm = (props: Props) => {
  const { control, watch } = useFormContext();
  const watchFieldArray = watch('groups');
  const {
    fields,
    remove: removeGroup,
    append: appendGroup
  } = useFieldArray({
    control,
    name: 'groups',
    keyName: 'group_id'
  });

  const controlledFields = fields.map((g, idx) => ({
    ...g,
    ...watchFieldArray[idx]
  }));

  const handleAddGroup = async (ids: number[], selectedProds: any[]) => {
    const differentGroups = differenceBy(selectedProds, controlledFields, 'id');
    const productInCollections = await Promise.all(
      differentGroups.map((group: TCollection) =>
        productInCollectionApi.getProductsInCollection(group.id)
      )
    );

    console.log(`productInCollections`, productInCollections);

    const newGroups = [...differentGroups];
    productInCollections.forEach((productData, idx) => {
      if (newGroups[idx]) {
        newGroups[idx].combination_mode = CombinationModeEnum.ChoiceCombo;
        newGroups[idx].products = productData.data.data.map((p) => ({
          ...p,
          min: 0,
          max: 0
        }));
      }
    });

    appendGroup([...newGroups]);
  };
  const selectedGroupIds = controlledFields?.map(({ id }) => id);
  console.log(`selectedGroupIds`, selectedGroupIds);

  return (
    <Stack spacing={2}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <CardTitle mb={2} variant="subtitle1">
          Nhóm sản phẩm
        </CardTitle>
        <ModalCollectionForm
          selected={selectedGroupIds}
          onSubmit={handleAddGroup}
          trigger={
            <Button variant="outlined" startIcon={<Add />}>
              Thêm nhóm sản phẩm
            </Button>
          }
        />
      </Stack>

      {controlledFields.map((group: TCollection, idx) => (
        <Stack spacing={2} key={`extra-product-group-${group.id}`}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <Label color="default">{idx + 1}</Label>
              <Typography variant="h6">{group.name}</Typography>
            </Stack>
            <IconButton onClick={() => removeGroup(idx)} sx={{ color: 'red' }} size="large">
              <Icon icon={trashIcon} />
            </IconButton>
          </Stack>
          <Stack spacing={2} pl={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputField
                  fullWidth
                  type="number"
                  label="Số sản phẩm tối thiểu được chọn trong nhóm"
                  name={`groups.${idx}.min`}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  fullWidth
                  type="number"
                  label="Số sản phẩm tối đa được chọn trong nhóm"
                  name={`groups.${idx}.max`}
                />
              </Grid>
            </Grid>
            <ProductGroupTable groupIdx={idx} control={control} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const ProductGroupTable = ({ groupIdx, control }: { groupIdx: number; control: any }) => {
  const arrName = `groups.${groupIdx}.products`;
  const watchFieldArr = useWatch({ control, name: arrName });
  const { fields } = useFieldArray({
    control,
    name: `groups.${groupIdx}.products`
  });

  const products = (fields ?? [])?.map((f, idx) => ({
    ...f,
    ...watchFieldArr[idx]
  }));

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Tối thiểu</TableCell>
            <TableCell align="center">Tối đa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((data, idx) => (
            <TableRow key={data.id}>
              <TableCell align="left">
                <Box display="flex" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar variant="square" src={data.pic_url} />
                    <Typography noWrap>{data.product_name}</Typography>
                  </Stack>
                </Box>
              </TableCell>
              <TableCell align="center">{data.price}</TableCell>
              <TableCell align="center">
                <InputField
                  type="number"
                  size="small"
                  key={`product-position-${data[idx]?.id}`}
                  label="Tối thiểu"
                  name={`${arrName}.${idx}.min`}
                />
              </TableCell>
              <TableCell align="center">
                <InputField
                  type="number"
                  size="small"
                  key={`product-position-${data[idx]?.id}`}
                  label="Tối đa"
                  name={`${arrName}.${idx}.max`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChoiceGroupComboForm;
