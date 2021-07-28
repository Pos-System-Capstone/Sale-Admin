/* eslint-disable no-plusplus */
import {
  TableContainer,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  Button,
  Stack,
  Box,
  Autocomplete,
  Chip,
  Divider,
  IconButton,
  Typography
} from '@material-ui/core';

import { Field } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { InputField, AutoCompleteField } from '../../../components/form';

const getCombn = (arr) => {
  if (arr.length === 1) {
    return arr[0];
  }
  const ans = [];

  // recur with the rest of the array.
  const otherCases = getCombn(arr.slice(1));
  for (let i = 0; i < otherCases.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      ans.push([arr[0][j], otherCases[i]]);
    }
  }
  return ans;
};

const VariantForm = ({ name }) => {
  const { control } = useFormContext();
  const {
    fields: variants,
    append: push,
    remove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const variantData = useWatch({
    control,
    name: 'variants'
  });
  const variantArr = variantData.reduce((acc, { values }) => acc?.concat([values]), []);

  console.log(`variantData`, variantData);

  const combinationVariants = getCombn(variantArr) ?? [];

  const buildVariantTable = () => (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sản phẩm</TableCell>
            <TableCell align="center">Giá sản phẩm</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combinationVariants.map((variant) => (
            <TableRow key={(Array.isArray(variant) ? variant : [variant]).join('-')}>
              <TableCell align="left">
                {(Array.isArray(variant) ? variant : [variant]).join('-')}
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  defaultValue={0}
                  type="number"
                  // InputProps={{ inputProps: { min: 0, max: 10 } }}
                  size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">VND</InputAdornment>
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

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
