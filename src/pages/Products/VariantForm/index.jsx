/* eslint-disable no-plusplus */
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { isEqual } from 'lodash';
import { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { getCbn } from 'utils/utils';
import { AutoCompleteField, InputField } from '../../../components/form';

const VariantForm = ({ name }) => {
  const { control } = useFormContext();
  const {
    fields: childProducts,
    remove: removeChildProd,
    update: updateChildProd,
    append: appendChildProd
  } = useFieldArray({
    control,
    name: 'child_products'
  });

  const {
    fields: variants,
    append: push,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  // => [['a','b']]

  useEffect(() => {
    const variantArr = variants?.reduce((acc, { values = [] }) => [...acc, values], []);
    const prodComb = getCbn(...(variantArr ?? []));
    // [[a,c][b,c]]
    const generateDefaultProductChilds = prodComb.map((atts = []) => ({
      atts,
      is_available: true,
      code: `${atts.join('')}`,
      product_name: `${atts.join('-')}`
    }));

    generateDefaultProductChilds.forEach((child) => {
      appendChildProd(child);
    });

    // set new value for child_products
  }, [variants, appendChildProd]);

  const buildVariantTable = () => (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Mã sản phẩm</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {childProducts.map(({ atts, product_name, id }, index) => (
            <TableRow key={id}>
              <TableCell align="left">
                <InputField name={`child_products.${index}.product_name`} fullWidth size="small" />
              </TableCell>
              <TableCell>
                <InputField name={`child_products.${index}.code`} fullWidth size="small" />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="error" onClick={() => removeChildProd(index)}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  console.log(childProducts);

  return (
    <Stack spacing={2}>
      {variants.map(({ optName, values }, optIndex) => (
        <Box key={`variant-${optIndex}`}>
          <Stack direction="row" spacing={2}>
            <InputField name={`variants.${optIndex}.optName`} size="small" label="Tên tùy chọn" />

            <AutoCompleteField
              name={`variants.${optIndex}.values`}
              multiple
              size="small"
              options={values}
              fullWidth
              freeSolo
              label="Tùy chọn"
              placeholder="Nhấn Enter để thêm giá trị"
              getOptionLabel={(option) => option}
              // renderTags={(value, getTagProps) =>
              //   value.map((option, index) => (
              //     <Chip
              //       size="small"
              //       key={option}
              //       variant="outlined"
              //       label={option}
              //       {...getTagProps({ index })}
              //     />
              //   ))
              // }
            />

            <IconButton
              disabled={optIndex === 0}
              onClick={() => remove(optIndex)}
              size="small"
              aria-label="delete"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
      <Divider />
      <span>
        <Button
          onClick={() =>
            push({
              optName: '',
              values: []
            })
          }
          variant="outlined"
        >
          Thêm tùy chọn
        </Button>
      </span>
      <Box>
        <Typography variant="subtitle2">Danh sách</Typography>
        {buildVariantTable()}
      </Box>
    </Stack>
  );
};

export default VariantForm;
