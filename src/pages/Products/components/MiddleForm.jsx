import React from 'react';
import {
  Box,
  Divider,
  TextField,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core';
import { FieldArray } from 'formik';
import { useFormContext, useWatch } from 'react-hook-form';

import VariantForm from '../VariantForm';
import { CardTitle, Card } from './Card';
import { ReactComponent as UploadSVG } from '../../../assets/images/upload.svg';
import ProductPriceForm from '../ProductPriceForm';
import {
  RadioGroupField,
  InputField,
  CheckBoxField,
  UploadImageField
} from '../../../components/form';
import { PRODUCT_TYPE_DATA } from '../../../constraints';

// eslint-disable-next-line arrow-body-style
const MiddleForm = () => {
  const { control, setValue, handleSubmit } = useFormContext();

  const hasVariant = useWatch({
    control,
    name: 'hasVariant'
  });
  return (
    <Box p={1} flex={1}>
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Chi tiết sản phẩm
          </CardTitle>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputField name="code" label="Mã sản phẩm" required size="small" />
              <InputField
                name="product_name"
                label="Tên sản phẩm"
                required
                size="small"
                fullWidth
              />
            </Stack>
            <Box>
              <InputField
                name="description"
                sx={{
                  width: '100%'
                }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                label="Miêu tả"
              />
            </Box>
          </Stack>
          <Typography my={2} variant="subtitle2">
            Loại sản phẩm
          </Typography>
          <RadioGroupField
            size="small"
            name="product_type"
            // label="Loại"
            options={PRODUCT_TYPE_DATA}
            disabled
            fullWidth
            sx={{
              flexDirection: 'row'
            }}
          />
        </Box>
      </Card>

      <Card id="product-image">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Hình ảnh</CardTitle>
          <UploadImageField name="thumbnail" />
        </Box>
      </Card>

      <Card id="price">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Bảng giá</CardTitle>
          <ProductPriceForm name="menus" />
        </Box>
      </Card>
      <Card id="variants">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Biến thể</CardTitle>
          <Stack direction="column">
            <CheckBoxField
              name="hasVariant"
              color="primary"
              label="Sản phẩm này có các tùy chọn như màu sắc, kích cỡ."
            />
            {hasVariant && (
              <Stack direction="column" justifyContent="start" spacing={2}>
                <Divider />
                <Typography variant="subtitle2">Tùy chọn</Typography>
                <VariantForm name="variants" />
              </Stack>
            )}
          </Stack>
        </Box>
      </Card>
      <Card id="seo">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <InputField
                name="seo.link"
                size="small"
                type="text"
                label="Đường dẫn SEO"
                sx={{
                  width: '50%'
                }}
              />
              <InputField
                name="seo.title"
                size="small"
                type="text"
                label="Từ khóa SEO"
                sx={{
                  width: '50%'
                }}
              />
            </Stack>
            <InputField
              name="seo.description"
              fullWidth
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              label="Mô tả SEO"
            />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default MiddleForm;
